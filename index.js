require("dotenv").config(); 
const express = require("express")
const path = require("path")
const session = require("express-session");
const cookieParser  = require("cookie-parser")
const urlRouter = require("./router/index")
const {connectedToMongoDb} = require("./connection")
const {checkForAuthentication , restrictTo} = require("./middleware/auth")

const Url = require("./model/url")
const userRouter = require("./router/user")
const staticRouter = require("./router/staticRouter")
const app = express()

app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"))

const PORT = 4001
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication)

app.use(
    session({
        secret: "my-secret-key",
        resave: false,
        saveUninitialized: false
    })
); 

app.get("/test", async (req, res) => {
    const allUrls = await Url.find({
        createdBy: req.user.uid
    });

    return res.render("home", {
        id: req.query.id,
        urls: allUrls
    });
});


app.get("/logout", (req, res) => {
    res.clearCookie("token");

    return res.redirect("/login");
});


connectedToMongoDb(process.env.MONGODB_URI)
    .then(() => {
        console.log("Mongoose DB connected");
    })
    .catch((error) => {
        console.log("Mongoose DB Connection fail", error);
    });


app.use("/url",restrictTo(["NORMAL", "ADMIN"]), urlRouter);
app.use("/user", userRouter)

app.use("/", staticRouter )
app.get("/:ShortId", async (req, res) => {

    const ShortId = req.params.ShortId;

    const Entry = await Url.findOneAndUpdate(
        { ShortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        },
        { returnDocument: "after" }
    );

    // console.log("Entry:", Entry);

    if (!Entry) {
        return res.status(404).send("Short URL not found");
    }

    return res.redirect(Entry.redirectUrl);
});

app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
})
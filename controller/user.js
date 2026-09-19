const { v4:  uuidv4 } = require("uuid")
const User = require("../model/users")
const {  setUser, getUser} = require("../service/auth")
async function handleCreateUserSignUp(req, res) {
    try {
        const {name , email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    })

   return res.redirect("/");

    } catch (error) {
        console.log(error)
        return res.status(500)
        .send("Email Already Exits ..")
    }
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
        return res.render("login", {
            error: "Invalid email or password"
        });
    }

    const token = setUser(user);

    res.cookie("token", token);

    return res.redirect("/");
}
module.exports = {
    handleCreateUserSignUp,
    handleUserLogin,
} 
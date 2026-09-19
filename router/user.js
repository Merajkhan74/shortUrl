const express = require("express")
const {handleCreateUserSignUp , handleUserLogin} = require("../controller/user")
const User = require("../model/users")

const router = express.Router()

router.post("/", handleCreateUserSignUp)
router.get("/login", (req, res) => {
    return res.render("login");
        error: req.query.error || null

});
router.post("/login", handleUserLogin)
module.exports = router

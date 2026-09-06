const express = require("express")
const Url = require("../model/url")
const router = express.Router()
const { restrictTo} = require("../middleware/auth")

router.get("/admin/user", restrictTo(["ADMIN"]), async  (req, res)=>{
  // if(!req.user) return res.redirect("/login")
   const allUrls = await Url.find({}).populate("createdBy", "name email role");
  // const allUrls =  await Url.find({})
  return res.render("home",{
    urls : allUrls ,
    
  })
})

router.get("/",restrictTo(["NORMAL" ,"ADMIN"]), async  (req, res)=>{
  // if(!req.user) return res.redirect("/login")
  const allUrls =  await Url.find({ createdBy : req.user.uid})
  return res.render("home",{
    urls : allUrls ,
    
  })
})

router.get("/signup" , (req, res)=>{
  return res.render("signup")
})
router.get("/login" , (req, res)=>{
  return res.render("login")
})


module.exports = router 
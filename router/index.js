const express = require("express")
const { nanoid } = require("nanoid");
const {handleGenerateNewUrl, handleGetAnalytics} = require("../controller/url")
const router = express.Router()


router.post("/",handleGenerateNewUrl)
router.get("/analytics/:shortId", handleGetAnalytics);
module.exports = router 



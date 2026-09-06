const { nanoid } = require("nanoid");
const Url = require("../model/url");

async function handleGenerateNewUrl(req, res) {
    const body = req.body || {};
    console.log("USER:", req.user ,);
    
    if (!body.url) {
        return res.status(400).json("URL is required");
    }

    const ShortId = nanoid(8);
   //  const allUrls = await Url.find({});

        await Url.create({
            ShortId: ShortId,
            redirectUrl: body.url,
            visitHistory: [],
            createdBy: req.user.uid
        });


     return res.redirect(`/test?id=${ShortId}`);
  
}

async function handleGetAnalytics(req, res) {

    const ShortId = req.params.shortId;

    const result = await Url.findOne({ ShortId });

    if (!result) {
        return res.status(404).json({
            message: "Short URL not found"
        });
    }

    return res.json({
        totalClicks: result.visitHistory.length,
        visitHistory: result.visitHistory
    });
}

module.exports = {
    handleGenerateNewUrl,
    handleGetAnalytics
};
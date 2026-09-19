const mongoose = require("mongoose");

async function connectedToMongoDb(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectedToMongoDb
};
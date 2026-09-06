const mongoose = require("mongoose");


async function connectedToMongoDb(url){
    mongoose.connect(url)
}
// const connection = async  ()=>{
//     try {
//         await mongoose.connect("mongodb://127.0.0.1:27017/shortUrl")
//         console.log("Mongoose DB connected ")
//     } catch (error) {
//         console.log("Mongoose DB Connection fail ")
//     }
// }

// module.exports= connection

module.exports={
    connectedToMongoDb
}
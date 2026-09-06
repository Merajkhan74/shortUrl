const mongoose = require("mongoose")

const userScema = new mongoose.Schema({
    name :{
        type: String,
        require :true,
    },
    email:{
        type :String,
        require: true,
        unique :true,
    },
    role:{
        type :String,
        require : true,
        default : "NORMAL",
    },
    password :{
        type :String,
        require : true,
    }

},{timestamps: true})

const User = mongoose.model("user" , userScema)

module.exports = User
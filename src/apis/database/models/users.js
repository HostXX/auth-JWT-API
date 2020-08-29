const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    email: {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    surname : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : false
    },
    role : {
        type: String,
        default : 'USER'
    },
    createdAt:{
        type : Date,
        default : Date.now()
    },
})

let post = mongoose.model('Users',PostSchema)

module.exports = post
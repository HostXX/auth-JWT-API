const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    date : {
        type :Date,
        default : Date.now()
    }
})

let post = mongoose.model('Post',PostSchema)

module.exports = post
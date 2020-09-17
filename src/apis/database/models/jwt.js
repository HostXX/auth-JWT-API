const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required : true
    },
    token : {
        type : String,
        required : true
    },
    isValid : {
        type : String,
    },
    date : {
        type :Date,
        default : Date.now() + 5*60*1000
    }
})

let post = mongoose.model('jwt',PostSchema)

module.exports = post
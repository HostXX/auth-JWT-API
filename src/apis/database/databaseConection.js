const mongoose = require('mongoose')
require('dotenv/config')


let postConectionCallBack = ()=>{console.log("Database conected")}
let options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

module.exports = mongoose.connect(process.env.DB_CONNECT,options,postConectionCallBack())
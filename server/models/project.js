const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive','inprogress']
    },
    description:{
        type:String,
    },
    clientID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'client'
    }
  
})


module.exports = mongoose.model('Project',projectSchema);
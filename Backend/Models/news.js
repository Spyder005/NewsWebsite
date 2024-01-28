const mongoose = require('mongoose')
const {Schema} =mongoose


const newsSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    authorname:{
        type:String,
        required:true,
    },
    countryname:{
        type:String,
        required:true,
    },
    categoryname:{
        type:String,
        required:true,
    },
    // category:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Category',
    //     required:true,
        
    // },
    profile:{
        type:String,
        rquired:true,

    },
    date:{
        type:Date,
        default:Date.now,
    },
    description:{
        type:String,
        required:true,
    },
    readmore:{
        type:String,
        required:true,
    }
    

})
module.exports =mongoose.model('newsSchema',newsSchema);
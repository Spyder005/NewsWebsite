const mongoose = require('mongoose')
const {Schema} =mongoose;

const categorySchema = new Schema({
       categoryname:{
           type:String,
           required:true,
           unique:true,
       }
},{timestamps:true})

module.exports =mongoose.model('Category', categorySchema);
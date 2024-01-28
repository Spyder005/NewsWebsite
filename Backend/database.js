const mongoose = require('mongoose')
const mongoURI ="mongodb+srv://spyder0503:spyder0503@news.esvxqqf.mongodb.net/newsdata?retryWrites=true&w=majority"

const mongoDB =async()=>{
    try{
        await mongoose.connect(mongoURI, { useNewUrlParser: true ,useUnifiedTopology: true  });
        console.log('Connected to MongoDB');
    } catch(e){
        console.log('Error connecting to MongoDB')
    }
}

module.exports =mongoDB;
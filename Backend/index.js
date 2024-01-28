const express =require('express')
const mongoDB = require('./database')



const app =express()



 const port = 5001

console.log("port : ",port)
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Accept");
    next();
});


mongoDB();
app.get('/',(req,res)=>{
    res.send('Hello World')
})

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
 app.use('/uploads',express.static("uploads"));
 app.use('/api',require("./Routes/Createnews"));
  app.use('/api',require("./Routes/Createadmin"));
 app.use('/api',require("./Routes/Createcategory"));
  app.use('/api',require("./Routes/Updatenews"))
   app.use('/api',require("./Routes/Getnews"))
   app.use('/api',require("./Routes/Deletenews"))
  
//    app.use('/api',require("./Routes/Createadmin"))
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})
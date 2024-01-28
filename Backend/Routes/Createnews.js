const express =require('express')
const router =express.Router()

const News = require('../Models/news')
const upload =require('../multerconfig/config')



router.post('/createnews',upload.single("user_profile"),async (req,res)=>{
     const file=req.file.filename;
    const  {title,authorname,countryname,description,readmore,categoryname} = req.body
    console.log("body",title,authorname);
    try{
         await News.create({
            title,
            authorname,
            countryname,
            description,
            readmore,
            categoryname,
             profile:file
         })
         res.json({success:true});
    }
    catch(err){
        console.log(err)
        res.json({success:false});
    }
})

module.exports =router;

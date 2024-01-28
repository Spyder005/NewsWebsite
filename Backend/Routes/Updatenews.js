const express =require('express');
const router =express.Router();
// const fetch = require('node-fetch');
const News =require('../Models/news');
const upload =require('../multerconfig/config')

// router.get('/getnews/:id',async (req, res) =>{
//      try{
//           const data =await News.findById(req.params.id);
//           res.json(data);
//      }
//      catch(err){
//         console.log(err);

//      }
// })

router.post("/updatenews/:_id",upload.single("user_profile"),async(req,res)=>{
   const id = req.params._id
   const file =req.file ?req.file.filename:user_profile
    try{
         const updatedItem = await News.findByIdAndUpdate(id,
            {"title":req.body.title,
         "description":req.body.description,
         "countryname":req.body.countryname,
         "authorname":req.body.authorname,
         "readmore":req.body.readmore,
         "categoryname":req.body.categoryname,
         "profile":file
        });
        if(!updatedItem) return res.status(404).json({error:'Item not found'});
         else{ 
            updatedItem.title = req.body.title,
            updatedItem.description =req.body.description
            updatedItem.countryname =req.body.countryname
            updatedItem.authorname =req.body.authorname
            updatedItem.readmore =req.body.readmore
            updatedItem.categoryname = req.body.categoryname
            updatedItem.profile =file
           
         }


     
          res.json({success:true});
       
        //  res.json(result);
    }
    catch(err){
           console.log(err);
           res.json({success:false});
    }
})

module.exports=router;

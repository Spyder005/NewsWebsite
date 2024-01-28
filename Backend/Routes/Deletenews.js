const express = require('express');
const router = express.Router();

const News =require('../Models/news');

router.delete("/deletenews/:_id" ,async (req,res)=>{
     const id = req.params._id;
     try {
    const deleteitem = await News.findByIdAndDelete(id);
    if(!deleteitem) return res.status(404).json({error:'Item not found'});
    res.json({success:true});
   
//     { (!deleteitem)? <div>
//         alert("Delete item successfully")

//     </div>
//     : <div>
//         alert("Delete item failed") </div>
// }
     } catch(e){
        console.log(e.message);
     }
})

module.exports=router;
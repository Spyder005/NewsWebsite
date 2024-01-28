const express =require("express");
const router =express.Router();
const Category = require('../Models/category')

router.post('/createcategory', async(req,res)=>{
    const{categoryname} = req.body
    if (!categoryname) {
        return res.status(400).json({ error: 'Category name is required' });
      }
    try{
        await Category.create({categoryname})
        res.json({success:true})
    }
    catch(err){
        console.log(err)
        res.json({success:false})
    }
} )

router.get('/getcategory', async(req,res)=>{
    try{
        const data =await  Category.find({})
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports =router
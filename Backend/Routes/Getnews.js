const express =require('express');
const router =express.Router();

const News =require('../Models/news');

router.get('/getnews/:id',async (req, res) =>{
     try{
          const databyid =await News.findById(req.params.id);
          
          res.json(databyid);
     }
     catch(err){
        console.log(err);
     }
})

router.get('/news',async(req, res) =>{
    try{
        const data =await News.find({})
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router;
const express = require('express');
const router = express.Router();
const newAdmin =require('../Models/admin');
 const {body ,validationResult}=require('express-validator')
const bcrypt =require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecret ="Mynameismanaschouhdaryechannel#$"

 router.post('/createadmin',
 [
           body('email').isEmail(),
           body('password','Invalid password').isLength({min:5})
 ],
 async(req,res)=>{
         const errors =validationResult(req)
         if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});

         } 
        
         const salt =await bcrypt.genSalt(5);
         const secPassword =await bcrypt.hash(req.body.password,salt);
         try{
             
            await newAdmin.create({
                name:req.body.name,
                password:secPassword,
                email:req.body.email
            })
            res.json({success:true});
         }
         catch(error){
            console.log(error);
            res.json({success:false});
         }
 })


 router.post('/loginuser',[


    body('email').isEmail(),
    body('password','Incorrect password').isLength({min:5})
 ],async (req,res)=>{
    const errors =validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});

    } 
     let email =req.body.email;
    try{
        let adminData =await newAdmin.findOne({email})
         if(!adminData){
            return res.status(400).json({errors:"check your email or sign up"})
         }
        //  console.log(adminData)
         const pwdcompare =await bcrypt.compare(req.body.password,adminData.password);
          if(!pwdcompare){
            return res.status(400).json({errors:"enter correct password"})
          }
          const data ={
            admin:{
                id:adminData.id
            }
          }
          const authToken = jwt.sign(data,jwtSecret)
        //   localStorage.setItem('authToken',authToken)
        //  localStorage.setItem('authToken', JSON.stringify(authToken));
          return res.json({success:true,authToken:authToken})
   
        }catch(err){
             console.log(err)
             res.json({success:false})
    }

 })
 module.exports =router;
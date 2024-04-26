const express=require('express')
const router=express.Router()
const User=require("../db/User")
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const jwtsecret="MynameisAyushKaushalfromJalaunUP"


router.post('/createuser',
 body('email').isEmail(),
body('password').isLength({ min: 5 }),
async(req,resp)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }

    const salt=await bcrypt.genSalt(10)
    let secpassword=await bcrypt.hash(req.body.password,salt)

    try {
        await User.create({
            name:req.body.name,
            password:secpassword,
            email:req.body.email,
          
        })
        resp.json({success:true})
    } catch (error) {
        console.log(error)
        resp.json({success:false})
    }
})

router.post('/login',
body('email').isEmail(),
body('password').isLength({ min: 5 }),
async(req,resp)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
      }
    let email=req.body.email;
    try {
        let userdata=await User.findOne({email})
            if(!userdata){
                return resp.status(400).json({ errors: "Invalid " });
            }
            const pwdcompare=await bcrypt.compare(req.body.password,userdata.password)
            if(!pwdcompare){
                return resp.status(400).json({ errors: "password wrong" });
            }
          
        const data={
            user:{
                user:userdata.id
            }
        }
        const authtoken=jwt.sign(data,jwtsecret)
            return resp.json({success:true,authtoken:authtoken})
       
    } catch (error) {
        console.log(error)
        resp.json({success:false})
    }
})

module.exports=router;
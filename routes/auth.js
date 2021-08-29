const dotenv= require('dotenv');
dotenv.config();
const router=require("express").Router();
const User=require('../models/User');
const cryptoJs = require('crypto-js');
const jwt=require('jsonwebtoken');


// Registration Method 
router.post("/register",async (req,res)=>{
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password: cryptoJs.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()
    });
    
    try {
        // console.log("user");
        const user=await newUser.save();
        res.status(201).json(user);    
    } catch (error) {
        // console.log("error");
        res.status(404).send(error);
    }
    
})

router.post("/login",async (req,res)=>{
    try {
        const data=await User.findOne({email:req.body.email});
        if(data){
            const bytes= cryptoJs.AES.decrypt(data.password,process.env.SECRET_KEY);
            const orignalPassword= bytes.toString(cryptoJs.enc.Utf8);
            if(orignalPassword===req.body.password){
                const accessjwt=jwt.sign({_id:data._id,isAdmin:data.isAdmin},process.env.SECRET_KEY,{
                    expiresIn:'5d'
                });
                const {password,...info} =data._doc;
                res.status(200).send({...info,accessjwt});
            }
            else{
                res.status(404).send("Invalid Credentials");
            }
        }
        else{
            res.status(404).send("Invalid Crdentials");
        }    
    } catch (error) {
        res.status(500).send(error);
    }
    
})


module.exports= router;
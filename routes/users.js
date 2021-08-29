const dotenv = require('dotenv');
dotenv.config();
const router=require('express').Router();
const User =require('../models/User');
const cryptoJs= require('crypto-js');
const verify = require('../verifyToken');


// Update User 

router.put('/:_id',verify,async (req,res)=>{
    if(req.user._id===req.params._id || req.user.isAdmin){
            if(req.body.password){
                req.body.password=cryptoJs.AES.encrypt(
                    req.body.password,
                    process.env.SECRET_KEY
                ).toString();
            }
            try{
                const updateUser= await User.findByIdAndUpdate(req.params._id,{
                    $set : req.body,
                },{new:true});
                res.status(200).json(updateUser);
            }catch(err){
                res.status(500).json(err);
            }
    }
    else{
        res.status(403).json("You can update only your Account");
    }
})


// Delete User 

router.delete('/:_id',verify,async (req,res)=>{
    if(req.user._id===req.params._id || req.user.isAdmin){
        try {
            const deleteUser =await findByIdAndDelete(req.params._id);
            res.status(200).json(`Deleted Account Successfully`);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You can Delete Only your Account");
    }
})

// Get User 

router.get('/find/:_id',async (req,res)=>{
    try {
        const user = await User.findById(req.params._id);
        const {password,...info} = user._doc;
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get All User 

router.get('/',verify,async (req,res)=>{
    const query= req.query.new;
    if(req.user.isAdmin){
        try {
            const users = query ? await User.find().limit(10) : await User.find();
            // const {password,...info}=users._doc;
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You are not Allowed to See the User Data");
    }
})
// Get User Stats




module.exports=router;
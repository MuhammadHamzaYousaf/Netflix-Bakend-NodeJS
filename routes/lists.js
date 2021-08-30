const router= require('express').Router();
const List= require('../models/List');
const verify=require('../verifyToken');


// Create List 

router.post('/',verify, async (req,res)=>{
    if(req.user.isAdmin){
        const newList =new List(req.body);
        try {
            const saveList =await newList.save();
            res.status(201).json(saveList);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You are not Allowed to Preform this Operation");
    }
});


// Delete List 
 
router.delete('/:_id',verify,async (req,res)=>{
    if(req.user.isAdmin){
        try {
            await List.findByIdAndDelete(req.params._id);
            res.status(200).json("Deleted List Successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You are not Allowed to Perform this Operation");
    }
});

// Get List 10 Movies

router.get('/',verify,async (req,res)=>{
    const typeQuery=req.query.type;
    const genreQuery=req.query.genre;
    let list=[];
    try {
        
        if(typeQuery){
            if(genreQuery){
                list=await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{type:typeQuery,genre:genreQuery}}
                ])
            }
            else{
                list=await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{type:typeQuery}}
                ])
            }
        }
        else{
            
            list = await List.aggregate([
                {$sample:{size:10}}
            ])
        }
        res.status(200).json(list);
    } catch (error) {
            res.status(500).json(error);
        }
});


module.exports= router;
const router = require('express').Router();
const Movie = require('../models/Movie');
const verify = require('../verifyToken');

// Create Movie 
router.post('/',verify,async (req,res)=>{
    if(req.user.isAdmin){
        const newMovie= new Movie(req.body);
        try {
            const saveMovie=await newMovie.save();
            res.status(201).json(saveMovie);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You are not Allowed to Add Movies");
    }
});

// Update Movie 

router.put('/:_id',verify,async (req,res)=>{
    if(req.user.isAdmin){
        try {
            const updateMovie= await Movie.findByIdAndUpdate(req.params._id,{
                $set:req.body
            },{new:true});
            res.status(200).json(updateMovie);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You are not Allowed to Update Movie Because You are not Admin");
    }
});


// Delete Movie 

router.delete('/:_id',verify,async (req,res)=>{
    if(req.user.isAdmin){
        try {
            await Movie.findByIdAndDelete(req.params._id);
            res.status(200).json("Deleted Movie Successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json("You are not Allowed to Delete Operation");
    }
});

// Get One Movie 

router.get('/find/:_id',verify,async (req,res)=>{
    try {
        const movie= await Movie.findById(req.params._id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
});


// Get Random Movie 

router.get('/random',verify,async (req,res)=>{
    const type=req.query.type;
    let movie;
    try {
        if(type==="series"){
                movie =await Movie.aggregate([
                {$match :{isSeries : true}},
                {$sample:{size:1}},
            ])
        }
        else{
                movie = await Movie.aggregate([
                {$match:{isSeries : false}},
                {$sample:{size:1}},
            ])
        }
    
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }

});


// Get All 
router.get('/',verify,async (req,res)=>{
    if(req.user.isAdmin){
        try {
            const dataMovies=await Movie.find();
            res.status(200).json(dataMovies);
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json("YOu are not Allowed to Operate this Function");
    }
})


module.exports = router;
const mongoose=require('mongoose');

const MovieSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
    },
    img:{
        type:String,
    },
    imgTitle:{
        type:String,
    },
    imgSm:{
        type:Boolean,
        default:false
    },
    trailer:{
        type:String
    },
    video:{
        type:String
    },
    year:{
        type:String
    },
    limit:{
        type:String
    },
    genre:{
        type:String
    },
    isSeries:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

const Movie =new mongoose.model("Movie",MovieSchema);
module.exports= User;
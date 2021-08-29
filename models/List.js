const mongoose=require('mongoose');

const ListSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String,
    },
    genre:{
        type:String
    },
    content:{
        type:Array
    }
},{
    timestamps:true
});

const List =new mongoose.model("List",ListSchema);
module.exports= List;
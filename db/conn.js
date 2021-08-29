const mongoose=require('mongoose');
const dotenv =require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    // useFindAndModify : false,
    // useCreateIndex : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Successfully Connection");
}).catch((err)=>{
    console.log(err);
})
const dotenv=require('dotenv');
dotenv.config();
const express =require('express');
const mongoose=require('mongoose');
const app =express();
const port=process.env.PORT;
require('./db/conn');
const AuthRouter=require('./routes/auth');
const userRouter=require('./routes/users');
const movieRouter=require('./routes/movies');
const listRouter=require('./routes/lists');



app.use(express.json());
app.use("/api/auth",AuthRouter);
app.use('/api/users',userRouter);
app.use('/api/movies',movieRouter);
app.use('/api/lists',listRouter);




app.listen(process.env.PORT,()=>{
    console.log(`Welcome to ${port}`);
})

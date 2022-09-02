import mongoose from 'mongoose';
import express from "express";
import dotenv from "dotenv";
const connectDB =  async ()=>{
  const connection=process.env.Connection;
  dotenv.config();

    try{
        const conn = await mongoose.connect(connection,{

            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex: true
        })
        console.log(`mongo database is connected!!! ${conn.connection.host} `)
    }catch(error){
        console.error(`Error: ${error} `)
        process.exit(1) //passing 1 - will exit the proccess with error
    }

}

export default connectDB

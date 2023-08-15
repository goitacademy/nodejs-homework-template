const express = require('express');
const path = require("path");
const configPath = path.join(__dirname, "..", "config", ".env");
require("dotenv").config({ path: configPath });
require("colors")
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const connectDb = require('./config/connectDb');
const ErrorHandler= require('./midlewares/errorHandler')

app.use("/api/v1",require('./routes/contactsRoutes'))
app.use(ErrorHandler)
connectDb()
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running, port ${process.env.PORT}!`.green.italic.bold)
})

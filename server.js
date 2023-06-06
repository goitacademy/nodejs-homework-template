const express = require("express")
const path = require('path');
const connectDB = require('./config/db_connect');
const errorHandler = require("./middlewares/errorHandler");
require('colors')
const configPath = path.join(__dirname, 'config', '.env')
require('dotenv').config({ path: configPath })

const app = express()
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use('/api/v1/contacts', require("./routes/api/contactsRoutes"))

app.use(errorHandler)
const { PORT } = process.env;
connectDB()
app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`.green.bold.italic)})

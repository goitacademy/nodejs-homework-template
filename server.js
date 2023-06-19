const express = require("express")
const path = require('path');
const connectDB = require('./config/db_connect');
const {HttpError} = require("./onError/index");
require('colors')
const configPath = path.join(__dirname, 'config', '.env')
require('dotenv').config({ path: configPath })

const app = express()
app.use(express.urlencoded({
    extended: false
}))
app.use(express.static('public'))
app.use(express.json())
app.use('/api/v1/users', require("./routes/api/authRoutes/authRoutes"))
app.use('/api/v1/contacts', require("./routes/api/contactsRoutes"))

app.use(HttpError)
const { PORT } = process.env;
connectDB()
app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`.green.bold.italic)})

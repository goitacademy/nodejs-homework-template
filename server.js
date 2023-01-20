const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const dotenv = require("dotenv");
dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());


mongoose.set('strictQuery', false)

const {DB_HOST} = process.env;

mongoose.connect(DB_HOST)
.then(()=> {
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  })
  console.log("Database connection successful");
})

.catch(error => {
  console.log(error.message)
  process.exit(1)
})


const contactsRouter = require('./routes/api/contacts');
app.use('/api/contacts', contactsRouter);

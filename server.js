const express = require('express')
const cors = require('cors');
const mongoose = reqire('mongoose')
const app = require('./app')
reqire('dotenv').config()

app.use(express.json());
app.use(cors())

const {  PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3000")
})
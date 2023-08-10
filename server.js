const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const routerApi = require('./api')

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api/contacts', routerApi)

app.use((_, res, __) => {
  res.status(404).json({ message: "Not found." });
})

app.use((err, _, res, __) => {
  res.status(500).json({
    message: err.message
  });
})

const PORT = process.env.PORT || 3000
const uriDb = "mongodb+srv://phonebookgoit:phonebookgoit@cluster0.ei3qkbz.mongodb.net/";


const connection = mongoose.connect(uriDb, {
  useUnifiedTopology: true,
})

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
  )

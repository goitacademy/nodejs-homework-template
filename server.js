const express = require('express')
const cors = require('cors')
const logger = require("morgan")
const mongoose = require('mongoose')

require('dotenv').config()

const routerApi = require('./routes')

const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.json())
app.use(logger(formatsLogger));
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
const uriDb = process.env.DATABASE_URL;

const connection = mongoose.connect(uriDb, {
  useUnifiedTopology: true,
  dbName: "db-contacts"
})

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful. PORT: ${PORT}`);
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
  )

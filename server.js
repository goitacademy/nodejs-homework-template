// mongodb+srv://Dima:aYaeu4mnDd8J7yM2@cluster0.spyu3.mongodb.net/test?authSource=admin&replicaSet=atlas-n1r7o2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true

const mongoose = require('mongoose');

const app = require('./app')

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch(err => {
    console.log(err.message)
    process.exit(1)
  })



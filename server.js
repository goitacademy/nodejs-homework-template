const mongoose = require('mongoose');
const { envsConfig } = require('./configs/index.js');
const app = require('./app.js');

// mongoose
mongoose.Promise = global.Promise;
const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(envsConfig.dbHost);
connection.then(() => {
  console.log("Database connection successful")
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}.`)
  })
}).catch(err => {
  console.log(`Server not runnung. Error message: ${err.message}.`)
  process.exit(1)
})





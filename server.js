require('dotenv').config()
const mongoose = require('mongoose')

const app = require('./app')

const PORT = process.env.PORT || 3003;
const uriDb = process.env.uriDb;

const connection = mongoose.connect(uriDb)

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`)
    stopApp();
  })

function stopApp() {
  console.log('Stopping the application...');
  process.exit(1);
}
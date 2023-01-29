const app = require('./app')
const mongoose = require('mongoose');
const process  = require('process');
mongoose.Promise = global.Promise;

mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 3000
const uriDb = process.env.DB_URI


const connection = mongoose.connect(
  uriDb
, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(error => {
  console.log(`Error ${error}`)
 process.exit(1)
 })

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful ${PORT} `)
   })
  })
   .catch((err) =>
   console.log(`Server not running. Error message: ${err.message}`),

   )





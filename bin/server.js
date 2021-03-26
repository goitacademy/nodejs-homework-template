const app = require('../app')

const PORT = process.env.PORT || 3000

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const { DB_HOST } = process.env;

const connect = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

connect
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(error => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  })


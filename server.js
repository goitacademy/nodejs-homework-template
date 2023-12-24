const app = require('./app')
const mongoose = require('mongoose');

const { DB_HOST, PORT } = process.env;
// mongoose.set('strictQuery', true);
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
  console.log("Database connection successful")
})
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

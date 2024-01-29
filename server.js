const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config();

mongoose.connect(process.env.DB_HOST)
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

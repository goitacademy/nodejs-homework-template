require('dotenv').config();
const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect('mongodb+srv://admin:aaaaaaa@atlascluster.xsuex4j.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful on port 3000");
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err.message);
    process.exit(1);
  }
});
// Art
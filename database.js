const mongoose = require('mongoose');
const dbUri = 'mongodb+srv://piterbartest:goit1234@cluster0.d55wcyi.mongodb.net/db-contacts?retryWrites=true&w=majority';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch(err => {
    console.error("Database connection error", err);
    process.exit(1);
  });

module.exports = mongoose;

const app = require('./app')
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_HOST;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    });
  })
  .catch(error => {
    console.log(`Unable to start the Server Service. Error message: ${error.message}`);
    process.exit(1);
  });

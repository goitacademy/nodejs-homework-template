const app = require('../app');

const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const DB_HOST =
  'mongodb+srv://Aleksandra605:Boebobo123@cluster0.mcwxr.mongodb.net/db-contacts?retryWrites=true&w=majority';

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

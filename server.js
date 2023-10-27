const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();
const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    console.log('Connected to the database!');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  });
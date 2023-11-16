const app = require('../app');
const mongoose = require('mongoose');
const { DB_HOST, PORT } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log('Database connection successfull ');
      console.log(`Server running on http://localhost:${PORT}/api/contacts`);
    }),
  )
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

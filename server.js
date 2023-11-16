const mongoose = require('mongoose');
const app = require('./app');
const { DB_HOST } = process.env.DB_HOST;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
mongoose.set('strictQuery', true);

// app.listen(3000, () => {
//   console.log('Server running. Use our API on port: 3000');
// });

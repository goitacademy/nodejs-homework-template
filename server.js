const app = require('./app');
const mongoose = require('mongoose');

const { DB_HOST, PORT } = process.env;

mongoose.set('strictQuery', true);
mongoose
 .connect(DB_HOST)
 .then(() => {
  console.log('Database connection successful');
  app.listen(PORT, () => {
   console.log('Server running. Use our API on port: 3000');
  });
 })
 .catch(err => {
  console.error('Database connection error:', err.message);
  process.exit(1);
 });

const app = require('./app');
const mongoose = require('mongoose');

const DB_HOST =
 'mongodb+srv://goit:pem3z910@cluster0.lucwigc.mongodb.net/db-contacts?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);
mongoose
 .connect(DB_HOST)
 .then(() => {
  console.log('Database connection successful');
  app.listen(3000, () => {
   console.log('Server running. Use our API on port: 3000');
  });
 })
 .catch(err => {
  console.error('Database connection error:', err.message);
  process.exit(1);
 });

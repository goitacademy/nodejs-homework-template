import app from './app.js';
import mongoose from 'mongoose';
const DB_HOST =
  'mongodb+srv://Oleg:znIK9lYoMcrCiQSF@cluster0.ff9csdk.mongodb.net/my-contacts?retryWrites=true&w=majority&appName=AtlasApp';
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

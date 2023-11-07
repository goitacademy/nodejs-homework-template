/*const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/contacts`);
});
*/
const mongoose = require('mongoose');

const app = require('./app');
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

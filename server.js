/** import app there are our logic */
const app = require('./app');
/** for work with db */
const mongoose = require('mongoose');

const { DB_HOST, PORT = 3000 } = process.env;

/** when db exist next step to run server */
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Server running. Use our API on port: 3000');
    app.listen(PORT);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log('Server running. Use our API on port: 3000');
// });

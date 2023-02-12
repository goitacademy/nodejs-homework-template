const mongoose = require('mongoose');
const app = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('db_connected');
    app.listen(PORT, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });

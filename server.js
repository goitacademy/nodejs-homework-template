const app = require('./app/app');
const { connect } = require('mongoose');
require('colors');

const { DB_HOST, PORT } = process.env;

connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful'.bgGreen.italic.bold);
    app.listen(PORT, () => {
      console.log(
        `Server running. Use our API on port: ${PORT}`.bgGreen.italic.bold
      );
    });
  })
  .catch(err => {
    console.log(err.message.bgRed.italic.bold, err.stack);
    process.exit(1);
  });

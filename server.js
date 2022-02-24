require('dotenv').config();
const app = require('./app');
const connection = require('./db/db_mongoose');

const PORT = process.env.PORT || 8081;

connection
  .then(() => {
    console.log('Connecting to database...');
    app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
  })
  .catch(error => {
    console.error(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });

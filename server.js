const app = require('./app');
const db = require('./model/contacts-db');
require('dotenv').config();

const PORT = 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: 3000`);
  });
}).catch(error => {
  console.log(`Error: ${error.message}.`);
});
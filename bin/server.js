const app = require('../app');
const db = require('../config/db');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server failed to run. Error: ${err.message}`);
});

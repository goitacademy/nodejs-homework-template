const app = require('../app');
const db = require('../config/db');

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = process.env.UPLOAD_DIR;
const USERS_AVATARS = process.env.USERS_AVATARS;

const mkdirp = require('mkdirp');

db.then(() => {
  app.listen(PORT, async () => {
    await mkdirp(UPLOAD_DIR);
    await mkdirp(USERS_AVATARS);
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server failed to run. Error: ${err.message}`);
});

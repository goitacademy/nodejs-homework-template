const mkdirp = require('mkdirp');
const dbContacts = require('../config/dbContacts');
const app = require('../app');
require('dotenv').config();

const AVATARS = process.env.AVATARS_OF_USER;
const TMP = process.env.TMP_AVATAR;

const PORT = process.env.PORT || 3000;

dbContacts
  .then(() => {
    app.listen(PORT, async () => {
      await mkdirp(TMP);
      await mkdirp(AVATARS);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(`Server not run. Error: ${err}`);
  });

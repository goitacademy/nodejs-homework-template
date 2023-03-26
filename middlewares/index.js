const checkContactId = require('./contactsMiddlwares');
const auth = require('./auth');
const upload = require('./upload');

module.exports = {
  checkContactId,
  auth,
  upload,
};

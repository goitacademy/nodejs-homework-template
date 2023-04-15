const checkContactId = require("./checkContactId");
const checkCreateContactData = require("./checkCreateContactData");
const checkUpdateContactData = require("./checkUpdateContactData");
const checkUser = require('./checkUser');
const checkAuth = require('./checkAuth');
const uploadUserAvatar = require('./uploadUserAvatar');

module.exports = {
  checkContactId,
  checkCreateContactData,
  checkUpdateContactData,
  checkUser,
  checkAuth,
  uploadUserAvatar,
};
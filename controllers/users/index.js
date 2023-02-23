const { ctrlWrapper } = require('../../helpers');
const getCurrent = require('./getCurrent');
const setSubscription = require('./setSubscription');
const logOut = require('./logOut');
module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  setSubscription: ctrlWrapper(setSubscription),
  logOut: ctrlWrapper(logOut),
};

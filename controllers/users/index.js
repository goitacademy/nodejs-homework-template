const { ctrlWrapper } = require('../../helpers');
const getCurrent = require('./getCurrent');
const setSubscription = require('./setSubscription');
const logOut = require('./logOut');
const addAvatar = require('./addAvatar');
module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  setSubscription: ctrlWrapper(setSubscription),
  logOut: ctrlWrapper(logOut),
  addAvatar: ctrlWrapper(addAvatar),
};

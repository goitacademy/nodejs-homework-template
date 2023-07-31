const {ctrlWrapper} = require("../utils");









module.exports = {
    registerNewUser: ctrlWrapper(registerNewUser),
    logInuser: ctrlWrapper(logInuser),
    logOutUser: ctrlWrapper(logOutUser),
    currentUser: ctrlWrapper(currentUser),
  };
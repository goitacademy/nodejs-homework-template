const {register} = require("./register");
const {login} = require("./login");
const currentUser = require("./current");
const logout = require("./logout");
const subscription = require("./subscription");
const {updateAvatar} = require("./updateAvatar");

module.exports = {
    register,
    login,
    logout,
    currentUser,
    subscription,
     updateAvatar,
  };
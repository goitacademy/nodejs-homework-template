const registrationController = require("./registrationController.js")
const loginController = require("./loginController.js")
const logoutController = require("./logoutController")
const getCurrentController = require("./getCurrentController")
const updatePatchUserSubscription = require("./updatePatchUserSubscription")


module.exports = {
    registrationController,
    loginController,
    logoutController,
    getCurrentController,
    updatePatchUserSubscription
}
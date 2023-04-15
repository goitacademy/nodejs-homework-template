const { registrationController } = require("./registrationController");
const { loginController } = require("./loginController");
const { logoutController }= require("./logoutController");
const { currentUserController}= require("./currentUserController");


module.exports = {
    registrationController,
    loginController,
    logoutController,
    currentUserController
}
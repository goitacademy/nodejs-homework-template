const { registrationController } = require("./registrationController");
const { loginController } = require("./loginController");
const { logoutController }= require("./logoutController");
const { currentUserController } = require("./currentUserController");
const { uploadAvatarController } = require("./uploadAvatarController");


module.exports = {
    registrationController,
    loginController,
    logoutController,
    currentUserController,
    uploadAvatarController
}
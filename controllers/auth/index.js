const { signup } = require("./signup");
const { signin } = require("./signin");
const { getCurrent } = require("./getCurrent");
const { signout } = require("./signout");

module.exports = {
    signup,
    signin,
    getCurrent,
    signout,
};
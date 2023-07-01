const { ctrlWrapper } = require("../../helpers");

const register = require("./register")


module.exports = {
    register: ctrlWrapper(register),
}
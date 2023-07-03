const asyncHandler = require('express-async-handler')

const register = require("./register");

const login = require("./login");

module.exports = {
    register: asyncHandler(register),
    login: asyncHandler(login),
};
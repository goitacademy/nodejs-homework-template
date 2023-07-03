const asyncHandler = require('express-async-handler')

const register = require("./register");


module.exports = {
    register: asyncHandler(register),
  
};
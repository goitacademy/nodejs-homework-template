const asyncHandler = require("express-async-handler");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");

const register = require("./register");


module.exports = {
    register: ctrlWrapper(asyncHandler(register)),
  
};
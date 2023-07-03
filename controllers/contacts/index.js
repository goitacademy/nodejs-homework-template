const asyncHandler = require("express-async-handler");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");

const getAll = require("./getAll");
const getById = require("./getById");
const add = require("./add");
const updateById = require("./updateById");
const updateStatusContact = require("./updateStatusContact");
const deleteById = require("./deleteById");

module.exports = {
  getAll: ctrlWrapper(asyncHandler(getAll)),
  getById: ctrlWrapper(asyncHandler(getById)),
  add: ctrlWrapper(asyncHandler(add)),
  updateById: ctrlWrapper(asyncHandler(updateById)),
  updateStatusContact: ctrlWrapper(asyncHandler(updateStatusContact)),
  deleteById: ctrlWrapper(asyncHandler(deleteById)),
};
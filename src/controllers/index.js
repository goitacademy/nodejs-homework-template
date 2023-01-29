const getAll = require("./contacts/getAll");
const getById = require("./contacts/getById");
const addById = require("./contacts/addById");
const updateById = require("./contacts/updateById");
const updateFavorite = require("./contacts/updateFavorite");
const deleteById = require("./contacts/deleteById");

module.exports = { 
  getAll, 
  getById,
  addById, 
  updateById,
  updateFavorite,
  deleteById, 
};
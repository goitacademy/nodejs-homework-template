const getContacts = require("./getAll");
const getByid = require("./getByid");
const addPost = require("./addPost");
const remove = require("./remove");
const update = require("./updete");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getContacts,
  getByid,
  addPost,
  remove,
  update,
  updateFavorite,
};

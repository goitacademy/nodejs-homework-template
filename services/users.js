const { User } = require("../models");

const getOne = (filter) => {
  return User.findOne(filter);
};

const add = (newUser) => {
  return User.create(newUser);
};

module.exports = {
  getOne,
  add,
};

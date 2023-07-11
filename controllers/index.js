const {
  getAll,
  getById,
  add,
  updateById,
  updateStatusContact,
  deleteById,
} = require("./contacts");

const { 
  register, 
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("./auth");

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  updateStatusContact,
  deleteById,
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};

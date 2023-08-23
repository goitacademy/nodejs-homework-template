const { register, login,updateSubscriptionUser,logout,current } = require("./auth");
const {
  updateFavorite,
  updateById,
  addContact,
  deleteById,
  getById,
  getAll,
} = require("./contacts");
module.exports = {
  current,
  logout,
  updateSubscriptionUser,
  updateFavorite,
  updateById,
  addContact,
  deleteById,
  getById,
  getAll,
  register,
  login,
};

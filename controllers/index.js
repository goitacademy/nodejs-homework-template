const { register, login,updateSubscriptionUser,logout,current } = require("./auth");
const {
  updateFavorite,
  updateById,
  addContact,
  deleteById,
  getById,
  getAll,
} = require("./contacts");
const {uploadAvatar}=require("./user")
module.exports = {
  uploadAvatar,
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

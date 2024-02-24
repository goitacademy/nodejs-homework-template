const User = require("./schemas/user");

const createUser = ({ email, password }) => {
  return User.create({ email, password });
};

const findUser = ({ email,token }) => {
  return User.findOneAndUpdate({email, token});
};




const findUserByID = ({ id }) => {
  return User.findByIdAndUpdate({_id:id}, { token: null })
};

module.exports = {
  createUser,
  findUser,
  findUserByID,
};

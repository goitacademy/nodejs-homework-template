const Users = require("../schemas/users")
const gravatar = require('gravatar')

const addUser = async ( email, password) => {
  const newUser = new Users({ email, password })
  newUser.setPassword(password);
  newUser.setUrl(gravatar)
  await newUser.save()
    
  }

  const findUser = async (email) => {
    const user = await Users.findOne({ email })
    return user;
  };

  const findUserById = async (id) => {
    const user = await Users.findOne({ _id: id});
    console.log(user)
    return user;
  };

  const currentUser = async (id) => {
    const user = await Users.findOne({ _id: id});
    console.log(user);
    return user;
  }

  const findUserByToken = async (token) => {
    return await Users.findOne({token});
  }

  module.exports = {addUser, findUser, findUserById, currentUser, findUserByToken}
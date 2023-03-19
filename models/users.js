const Users = require("../schemas/users")
const gravatar = require('gravatar')
const { v4: uuidv4 } = require('uuid');


const addUser = async ( email, password) => {
  const newUser = new Users({ email, password })
  newUser.setPassword(password);
  newUser.setUrl(gravatar);
  const verificationToken = uuidv4();
  newUser.setVerificationToken(verificationToken);
  
  await newUser.save()
  return verificationToken;
    
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

  const findUserByVerificationToken = async (verificationToken) => {
    return await Users.findOne({verificationToken});
  }

  

  module.exports = {addUser, findUser, findUserById, currentUser, findUserByToken, findUserByVerificationToken}
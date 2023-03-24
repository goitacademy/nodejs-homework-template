const service = require("../models/usersModel");

const userSignup = async (body) => {
  return await service.createUser(body);
};

const userLogin = async (credentials) => {
  const { email } = credentials;
  const response = await getUser("email", email);
  return response;
};

const getUser = async (property, value) => {
  return await service.getUserByValue({ property, value });
};

const updateUser = async (id, body) => {
  return await service.updateUser(id, body);
};

module.exports = { userSignup, userLogin, getUser, updateUser };
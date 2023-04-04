const {
  serializeSingInRespons,
  serializeUserResponse,
} = require("./auth.serializers");

const { singIn, singUp, deleteToken } = require("./auth.service");

const register = async (req, res, next) => {
  const user = await singUp(req.body);
  res.status(201).json(serializeUserResponse(user));
};

const login = async (req, res, next) => {
  const userWithToken = await singIn(req.body);
  res.status(201).send(serializeSingInRespons(userWithToken));
};

const currentUser = async (req, res, next) => {
  res.status(200).send(serializeUserResponse(req.user));
};

const logout = async (req, res, next) => {
  await deleteToken(req);
  res.status(204).send()
};

module.exports = { register, login, currentUser, logout };

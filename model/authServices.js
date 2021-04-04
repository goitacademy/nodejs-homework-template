const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const {
  findUserByEmailRepository,
  updateTokenRepository,
} = require("../repository/usersRepository");

const login = async ({ password, email }) => {
  const user = await findUserByEmailRepository(email);
  if (!user || !user.validPassword(password)) {
    return null;
  }
  const id = user.id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await updateTokenRepository(id, token);
  return token;
};

const logout = async (id) => {
  const data = await updateTokenRepository(id, null);
  return data;
};

module.exports = {
  login,
  logout,
};

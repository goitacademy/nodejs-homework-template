// expiresIn -  время работы токена
const Token = require("../model/tokenModel");
const jwt = require("jsonwebtoken");

exports.singToken = async (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//{
// const accessToken = jwt.sign(id, process.env.JWT_SECRET, { expiresIn: "1h" });
// const refreshToken = jwt.sign(id, process.env.JWT_SECRET, {
//   expiresIn: "30d",
// });
// return { accessToken, refreshToken };
//};

exports.checkToken = async (token) => {
  if (!token) console.log("Invalid token checkToken");
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    return id;
  } catch (error) {
    console.log(error);
  }
};
// exports.saveToken = async (userId, refreshToken) => {
//   const tokenData = await Token.findOne({ user: userId });
//   if (tokenData) {
//     tokenData.refreshToken = refreshToken;
//     return tokenData.save();
//   }
//   const token = await Token.create({ user: userId, refreshToken });
//   return token;
// };
// const checkYoken = (token) => {
//   if (!token) console.log("Invalid");
// };

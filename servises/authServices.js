const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
// const { HttpError } = require("../helper/HttpError");

const register = async (body, res) => {
  const currentUser = await User.findOne({ email: body.email });
  if (currentUser) {
    // throw new HttpError(409, "User alredy exist");
    return res.status(409).json({ message: "User alredy exist" });
  }
  body.password = await bcrypt.hash(body.password, 10);

  return await User.create(body);

  //   return res.status(201).end();
};

async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, "User not found");
  }
  const passwordCompara = await bcrypt.compare(password, user.password);
  if (!passwordCompara) {
    throw new HttpError(401, "Password incorrect");
  }
  S;
  // token
  const { _id: id } = user;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const decodeedToken = jwt.decode(token);

  // try {
  //   const { id } = jwt.verify(token, SECRET_KEY);
  // } catch (error) {
  //   console.log(error.message);
  // }

  res.json({ token });
}
module.exports = { register, login };

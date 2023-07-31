const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const {User} = require("../models/user");

const {HttpError} = require("../utils");

require('dotenv').config();

const {SECRET_KEY} = process.env;


const register = async (data) => {
  const { email, password } = data.body;
  const user = await User.findOne({email});

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...data.body, password: hashedPassword });

  return newUser;
};

const login = async(data) => {
  const { email, password } = data.body;
    const user = await User.findOne({ email });

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!user || !comparedPassword) {
        throw HttpError(401, "Email or password is wrong");
      };

      const payload = {
        id: user._id
    };
    
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "12h"});
    await User.findByIdAndUpdate(user._id, {token});
    return token;
};

const logout = async(data) => {
    const {_id} = data.user;
    const result = await User.findByIdAndUpdate(_id, {token: null});

    return result;
}

module.exports = {
  register,
  login,
  logout,
};

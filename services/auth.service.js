const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { SECRET_KEY } = process.env;

const registerUser = async (userData) => {
  const result = await User.findOne({ email: userData.email });
  if (result) {
    const error = new Error(`User alredy exsist`);
    error.status = 409;
    throw error;
  }

  const password = userData.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ ...userData, password: hashedPassword });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user && !user.verify) {
    const error = new Error(`Please confirm your email`);
    error.status = 401;
    throw error;
  };

  if (!user) {
    const error = new Error(`Login or password is not correct`);
    error.status = 401;
    throw error;
  };

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    const error = new Error(`Login or password is not correct`);
    error.status = 401;
    throw error;
  };

  const payload = {
    id: user._id,
    subscribtion: user.subscribtion,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  return {
    token,
  };
};

const logoutUser = async (id) => {
    await User.findByIdAndUpdate(id, { token: null })
};

const authenticateUser = async (token) => {
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        console.log('payload', payload);
        const { id } = payload;
        return await User.findById(id);
    } catch (error) {
        return null;
    }
};

module.exports = {
    registerUser,
    loginUser,
    authenticateUser,
    logoutUser,
};

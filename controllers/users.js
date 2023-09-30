const { User, hashPassword } = require("../models/user");
const gravatar = require("gravatar");

const createUser = async (email, password) => {
  const hashedPassword = hashPassword(password);
  const gravatarUrl = gravatar.url(email);

  try {
    const newUser = new User({
      email,
      password: hashedPassword,
      avatarURL: gravatarUrl,
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserByToken = async (token) => {
  try {
    const user = await User.findOne({ token });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateToken = async (_id, token) => {
  try {
    const user = await User.findByIdAndUpdate(_id, { token });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const logout = async (req, res) => {
  const { _id } = req.user;

  try {
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getUserByToken,
  updateToken,
  logout,
};

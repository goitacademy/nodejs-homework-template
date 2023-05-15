const { User, hashPassword } = require("../models/user.js");
const path = require("path");
var gravatar = require("gravatar");
const Jimp = require("jimp");
const NewStoreImage = path.join(process.cwd(), "public/avatars");
const jwt = require("jsonwebtoken");

const createUser = async (email, password, filePath) => {
  const hashedPassword = hashPassword(password);
  let avatar;
  try {
    if (filePath !== undefined) {
      avatar = gravatar.profile_url(email, {
        protocol: "https",
        format: "jpg",
      });

      const ImgName = path.basename(avatar);
      const newFilePath = path.join(NewStoreImage, ImgName);

      Jimp.read(filePath, (err, pict) => {
        if (err) throw err;
        pict.resize(250, 250).quality(80).write(newFilePath);
      });
    }

    const user = new User({
      email,
      password: hashedPassword,
      avatarURL: avatar,
    });

    user.save();
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const getUserById = async (_id) => {
  const user = await User.findOne({ _id });
  return user;
};

const updateTokenStatus = async (id, token) => {
  const user = await User.findByIdAndUpdate(id, { token }, { new: true });
  return user;
};

const findUserIdFromToken = (token) => {
  const jwtSecret = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, jwtSecret);
  const id = decoded.id;
  return id;
};

module.exports = {
  createUser,
  getUserByEmail,
  updateTokenStatus,
  getUserById,
  findUserIdFromToken,
};

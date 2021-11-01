const { User } = require("../schemas/users");
const ObjectId = require("mongodb").ObjectID;


const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const create = async ({ email, password }) => {
  const user = new User({ email, password });
  return await user.save();
};
// const verifyToken = uuidv4();
// console.log(verifyToken);
const createVerify = async (email, password, verifyToken) => {
  console.log(createVerify);
  const user = new User({ email, password, verifyToken });
  return await user.save();
};
const updateVerify = async (verifyToken) => {
  return await User.updateOne({ verifyToken: verifyToken });
};
const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};
const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatarURL: avatar });
};
const findByToken = async (token) => {
  return await User.findOne({ token: token });
};
// const findByVerificationToken = async (verificationToken) => {
//   return await User.findOne({ verificationToken: verificationToken });
// };
// const findByVerificationTokenold = async (verificationToken) => {
//   return await User.findOne({ verificationToken: verificationToken });
// };
const findByVerificationToken = async (verificationToken) => {
  return await User.findOne({ verifyToken: verificationToken });
};

const updateVerificationToken = async (id, verify, verifyToken) => {
  console.log("verifyToken:" + verifyToken);
  await User.updateOne({ _id: id }, { verifyToken: verifyToken });
  return await User.updateOne({ _id: id }, { verify: verify });
};
module.exports = {
  findByEmail,
  findById,
  create,
  createVerify,
  updateVerify,
  updateToken,
  updateAvatar,
  findByToken,
  findByVerificationToken,
  updateVerificationToken,
};

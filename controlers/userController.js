const contacts = require("../models/contacts");
const { contactSchema } = require("../Shema/shema");
const { HttpError } = require("../Helpers/HttpError");
const decorarot = require("../Helpers/decorator");
const User = require("../modelUser/userModel");
const bcrypt = require("bcrypt");
const { userServices } = require("../services");

//====================================get user==============================================
const getAllUser = async (req, res, next) => {
  // select   const user = await User.find().select("-email");
  const user = await User.find();
  res.status(200).json({ user });
};

const createUser = async (req, res, next) => {
  // const { password, email, ...restUserData } = req.body;
  // const salt = await bcrypt.genSalt(10);
  // const passwordHash = await bcrypt.hash(password, salt);
  // const newUser = await User.create({
  //   password: passwordHash,
  //   ...restUserData,
  // });
  // // proverka --- const passValid = await bcrypt.compare("");
  const newUser = await userServices.createUser(req.body);
  res.status(200).json({ msg: "create user" });
};

//===============================updateUser=================================
const updateUser = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const updateUser = await userServices
      .updateUser(contactId, req.body)

      .status(200)
      .json({ msg: "change", updateUser });
  } catch (error) {
    res.status(404).json({ message: "not valid ID" });
  }
};
//==========================================================================
//=======================delete user=========================
const deletUser = async (req, res, next) => {
  await userServices.deleteUser(req.params.id);
  res.sendStatus(204);
};

module.exports = {
  getAllUser: decorarot(getAllUser),
  createUser: decorarot(createUser),
  updateUser: decorarot(updateUser),
  deletUser: decorarot(deletUser),
};

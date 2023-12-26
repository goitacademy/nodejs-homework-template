const contacts = require("../models/contacts");
const { contactSchema } = require("../Shema/shema");
const { HttpError } = require("../Helpers/HttpError");
const decorarot = require("../Helpers/decorator");
const User = require("../modelUser/userModel");
//======================getAll==========================
const getAll = async (req, res, next) => {
  // select   const user = await User.find().select("-email");
  const user = await User.find();

  res.status(200).json({ user });
};

//========================getID========================
const getID = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    console.log(user);

    res.status(200).json({ msg: "Succsess!", user });
  } catch (error) {
    res.status(404).json({ msg: "problem!" });
  }
};

//=======================post=========================
const post = async (req, res, next) => {
  // const newContact = await contacts.addContact(req.body);
  // if (newContact === null) {
  //   new Error(status, message);
  // }
  const newContact = await User.create(req.body);
  res.status(201).json(newContact);
};

//=======================delete=========================
const delet = async (req, res, next) => {
  const { contactId } = req.params;
  const func = await contacts.removeContact(contactId);
  if (func) {
    res.status(200).json({ message: "contact deleted" });
  } else !func;
  {
    res.status(404).json({ message: "not found" });
  }
};

//========================put========================
const put = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (result === null) {
    res.status(404).json({ message: "not valid ID" });
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: decorarot(getAll),
  getID: decorarot(getID),
  post: decorarot(post),
  delet: decorarot(delet),
  put: decorarot(put),
};

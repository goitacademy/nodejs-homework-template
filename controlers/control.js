const contacts = require("../models/contacts");
const { contactSchema } = require("../Shema/shema");
const { HttpError } = require("../Helpers/HttpError");
const decorarot = require("../Helpers/decorator");
const User = require("../modelUser/userModel");
const Contact = require("../modelUser/contactModel");
//======================getAll==========================
const getAll = async (req, res, next) => {
  // select   const user = await User.find().select("-email");
  const user = await User.find();

  res.status(200).json({ user });
};

//========================getID========================
const getID = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.contactId);

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
  console.log(newContact);

  res.status(201).json(newContact);
};

//=======================delete=========================
const delet = async (req, res, next) => {
  const { contactId } = req.params;
  await User.findByIdAndDelete(contactId);
  res.sendStatus(204);
};

//========================put========================
const put = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const updateUser = await User.findByIdAndUpdate(contactId, {
      name,
      email,
      phone,
    });
    res.status(200).json({ msg: "change", updateUser });
  } catch (error) {
    res.status(404).json({ message: "not valid ID" });
  }
};

//========================/api/contacts/:contactId/favorite========================

const favorite = (req, res, next) => {
  const { contactId } = req.body;
   const { body } = req;

  const result = await Contact.findByIdAndUpdate(contactId, body);
  if (result) {
    res.json({ contact: result });
  } else {
    HttpError(404, "Not found");
  }
};
//==================================================================================

module.exports = {
  getAll: decorarot(getAll),
  getID: decorarot(getID),
  post: decorarot(post),
  delet: decorarot(delet),
  put: decorarot(put),
};

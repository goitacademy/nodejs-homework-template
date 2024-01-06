const contacts = require("../models/contacts");
const { contactSchema } = require("../Shema/shema");
const { HttpError } = require("../Helpers/HttpError");
const decorarot = require("../Helpers/decorator");
const Contact = require("../model/contactModel");
const shema = require("../Shema/shema");
//======================getAll==========================
const getAll = async (req, res, next) => {
  // for user pawword   const contacts = await Contact.find().select('-password');
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

//========================getID========================
const getID = async (req, res, next) => {
  const contact = await Contact.findById(req.params.contactId);
  if (!contact) throw new HttpError(404, "Contact not found");
  console.log(contact);
  res.status(200).json({ msg: "Id contact", contact });
};

//=======================create=========================
const post = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  // just for password  newUser.password = undefined
  res.status(201).json(newContact);
};

//=======================delete=========================
const delet = async (req, res, next) => {
  const { contactId } = req.params;
  await Contact.findByIdAndDelete(contactId);
  res.sendStatus(204);
};

//========================update========================
const put = async (req, res, next) => {
  const { contactId } = req.params;

  const { name, email, phone } = req.body;
  const updateUser = await Contact.findByIdAndUpdate(contactId, {
    name,
    email,
    phone,
  });

  res.status(200).json({ msg: "Contact is update", contact: updateUser });
};

//  =======================
const favorite = async (req, res, next) => {
  const { contactId } = req.params;
  const favorite = req.body.favorite;
  if (!favorite) res.status(400).json({ message: "missing field favorite" });
  const updateStatusContact(contactId, body) = req.body;
  if (updateStatusContact) res.status(200).json(updateStatusContact)
  res.status(404).json({" message ":" Not found "})
};
module.exports = {
  getAll: decorarot(getAll),
  getID: decorarot(getID),
  post: decorarot(post),
  delet: decorarot(delet),
  put: decorarot(put),
};

const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const getContact = await Contact.findById(id);

  if (!getContact) {
    throw HttpError(404, "Not found!");
  }
  res.status(200).json(getContact);
};

const addContact = async (req, res, next) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  const addedContact = await Contact.create(contact);
  console.log(contact);
  res.status(201).json(addedContact);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  const updatedContact = await Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found!");
  }
  console.log(updatedContact);
  res.status(200).send(updatedContact);
};

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;

  const updatedFavorite = await Contact.findByIdAndUpdate(
    id,
    {
      favorite: req.body.favorite,
    },
    {
      new: true,
    }
  );
  if (!updatedFavorite) {
    throw HttpError(404, "Not found!");
  }
  res.status(200).json(updatedFavorite);
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(id);
  console.log(deletedContact);
  if (!deletedContact) {
    throw HttpError(404, "Not found!");
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};

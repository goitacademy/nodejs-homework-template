const Contact = require("../service/schemas/schemas.js");
const httpError = require("../helpers/httpError");
const Wrapper = require("../helpers/Wrapper");
const { v4: uuidv4 } = require("uuid");

const listContacts = async (_, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.find({ _id: id });
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
    const { name, phone, email, favorite } = req.body;

    const newContact = new Contact({
      id: uuidv4(),
      name,
      phone,
      email,
      favorite
    });

    const result = await newContact.save();

    res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await Contact.findById({ _id: id});
  const result = await Contact.findOneAndRemove({ _id: id });

  if (!result) {
    throw httpError(404, "Contact not found");
  } else if (result) {
    res.status(200).json({ message: "Contact deleted", deletedContact});
    } else{
      throw httpError(500, "Error deleting contact");
    }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.updateOne({ _id: id }, {$set: {...req.body}});
  const updatedContact = await Contact.find({ _id: id });
  if (result.matchedCount === 0) {
    throw httpError(404, "Not found");
  }
  res.json(updatedContact);
}

const updateFavorite = async(req, res) => {
  const { id } = req.params;
  const result = await Contact.updateOne({ _id: id }, {$set: req.body});
  const updatedContact = await Contact.find({ _id: id });
  if (result.matchedCount === 0){
    throw httpError(404, "Not found");
  }
  res.json(updatedContact);
}

module.exports = {
  listContacts: Wrapper(listContacts),
  getContactById: Wrapper(getContactById),
  removeContact: Wrapper(removeContact),
  addContact: Wrapper(addContact),
  updateContact: Wrapper(updateContact),
  updateFavorite: Wrapper(updateFavorite)
};

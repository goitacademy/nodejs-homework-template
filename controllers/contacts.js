
const Contact = require('../models/contact');
const ctrlWrapper = require('../helpers/ctrlWrapper');
const { HttpError } = require('../helpers/HttpError');

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find()
  res.json({ contacts });
};

const getById = async (req, res) => {
  const contactId = req.params.id;
  const contact = await Contact.findById(contactId);
  
  if (contact) {
    res.status(200).json(contact);
  } else {
    throw new HttpError(404, 'Not found');
  }
};

const addOneContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const newContact = await Contact.create({ name, email, phone });

  return res.status(201).json(newContact);
};
  
const updateContactById =async (req, res) => {
  const contactId = req.params.id;
  const { name, email, phone } = req.body;

  const updatedContact = { name, email, phone };
  const result = await Contact.findByIdAndUpdate(
    contactId, 
    updatedContact, {
    new: true,
  });
  if (!result) {
    throw new HttpError(404, "Contact not found");
  }
  res.json(result);
};

const updateFavorite= async (req, res) => {
  const contactId = req.params.id;
  const { name, email, phone, favorite } = req.body;

  const updatedContact = { name, email, phone, favorite };
  const result = await Contact.findByIdAndUpdate(contactId, updatedContact , { new: true });

  res.json(result);
};

const deleteContactById = async (req, res) => {
  const contactId = req.params.id
  const result = await Contact.findByIdAndRemove( contactId );
  if (!result) {
    throw new HttpError(404, 'Contact not found');
  }
  res.json({ message: "contact deleted" });
};


module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  addOneContact: ctrlWrapper(addOneContact),
  updateContactById: ctrlWrapper(updateContactById),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateFavorite: ctrlWrapper(updateFavorite),
  
};




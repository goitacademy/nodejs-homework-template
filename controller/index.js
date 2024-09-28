const service = require("../service");
const { HttpError } = require("../helpers");

const getListContacts = async (req, res, next) => {
  try {
    const contacts = await service.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await service.getContactById(contactId);
    if (!contact)
      throw HttpError(404, `Сontact with id:${contactId} not found.`);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await service.addContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await service.removeContact(contactId);
    if (!contact)
      throw HttpError(404, `Сontact with id:${contactId} not found.`);
    res.status(200).json({ message: "Contact deleted." });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const {name,email,phone, favorite = false} = req.body;
  try {
    const contact = await service.updateContact(contactId, {name,email,phone,favorite});
    if (!contact)
      throw HttpError(404, `Сontact with id:${contactId} not found.`);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContactStatus = async(req, res, next) =>{
  const { contactId } = req.params;
  const {favorite = false} = req.body;
  try{
    const contact = await service.updateContact(contactId, {favorite});
    if (!contact)
      throw HttpError(404, `Сontact with id:${contactId} not found.`);
    res.status(200).json(contact);
  }
  catch (error) {
    next(error);
  }
}

module.exports = {
  getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus
};

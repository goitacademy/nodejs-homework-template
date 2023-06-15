const {
  getContactsService,
  getContactByIdService,
  addContactService,
  updateContactService,
  removeContactService,
} = require("../services/contactsServices");
const { HttpError } = require("../helpers/index");
const ctrlWrapper = require("../decorators/ctrlWrapper");


const getContacts = async (req, res) => {
  const result = await getContactsService();
  res.status(200).json(result);
};
const getContactById = async (req, res) => {
  const {id} = req.params;
  const result = await getContactByIdService(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.status(200).json(result);
};
const addContact = async (req, res, next) => {
    const result = await addContactService(req.body);
    res.status(201).json(result);
};
const updateContact = async (req, res, next) => {
    const {id} = req.params;    
    const result = await updateContactService(id, (req.body));
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
};
const removeContact = async (req, res, next) => {
    const {id} = req.params;    const result = await removeContactService(id);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.status(204).json({ mesage: "contact deleted" });

};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};

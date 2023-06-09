const contacts = require("../models/contacts");
const {
  HttpError,
  dataValidator,
  updatedDataValidator,
  ctrlWrapper,
} = require("../helpers");

const getAllContacts = async (req, res, next) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
};

const addContact = async (req, res, next) => {
    const { body } = req;
    const { error } = dataValidator(body);

    if (error) {
      const message = `missing required ${error.details[0].context.label} field`;
      throw HttpError(400, message);
    }

    const result = await contacts.addContact(body);
    res.status(201).json(result);
};

const deleteContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
};

const updateContactById = async (req, res, next) => {
    const { error } = updatedDataValidator(req.body);

    if (error) {
      throw HttpError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
};

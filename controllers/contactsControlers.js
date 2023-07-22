const contacts = require("../service/index");
const { HttpError, controllerWrapper } = require("../helper");

const getContacts = async (req, res, next) => {
  const response = await contacts.listContacts();
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(response);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const response = await contacts.getContactById(contactId);
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(response);
};

const addContact = async (req, res, next) => {
  const { body } = req;
  const response = await contacts.addContact(body);
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(201).json(response);
};

const deleteContatcById = async (req, res, next) => {
  const { contactId } = req.params;
  const response = await contacts.removeContact(contactId);
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json({message: "Contact deleted"});
};
const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const response = await contacts.updateContact(contactId, body);
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(response);
};

const updateStatusContact = async (req, res, next)=>{
    const { contactId } = req.params;
    const { body } = req;
    const response = await contacts.updateContact(contactId, body);
    if (!response) {
        throw HttpError(404, "Not Found");
      }
    res.status(200).json(response);
}

module.exports = {
  getContacts: controllerWrapper(getContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  deleteContatcById: controllerWrapper(deleteContatcById),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact:controllerWrapper(updateStatusContact)
};

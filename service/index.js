const { Types } = require("mongoose");
const { ContactModel } = require("./models/contact-model");
const { HttpError } = require("../helpers");

const listContacts = () => ContactModel.find();

const addContact = (body) => ContactModel.create(body);

const getContactById = (contactId) => ContactModel.findById(contactId);

const removeContact = (contactId) => ContactModel.findByIdAndDelete(contactId);

const updateContact = (contactId, body) => ContactModel.findByIdAndUpdate(contactId, body, { new: true });

const updateStatusContact = (contactId, body) => ContactModel.findByIdAndUpdate(contactId, body, { new: true });

const checkContactExistById = async id => {
  const idIsValid = Types.ObjectId.isValid(id);
  if(!idIsValid) throw new HttpError(404, 'Not found')
  const isContactExist = await ContactModel.exists({ _id: id });
  if(!isContactExist) throw new HttpError(404, 'Not found')
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
    checkContactExistById,
};

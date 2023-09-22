const HttpError = require("../helpers/HttpError");
const { Contact } = require("../schemas/ValidateSchemasContacts");

const ifIsResult = (result) => {
  if (!result) {
    throw HttpError(404, "Not found");
  }
};

const getAll = async (page = 1, limit = 10) => {
  const total = await Contact.count();
  const skip = (page - 1) * limit;
  const contacts = await Contact.find().skip(skip).limit(+limit);
  ifIsResult(contacts);
  return { contacts, page: +page, limit: +limit, total };
};

const getById = async (contactId) => {
  const searchedContact = await Contact.findById(contactId);
  ifIsResult(searchedContact);
  return searchedContact;
};

const addContactToDB = async (body) => {
  const newContact = await Contact.create(body);
ifIsResult(newContact);
  return newContact;
};

const updateContactById = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
 ifIsResult(updatedContact);
  return updatedContact;
};

const deleteContactById = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);
ifIsResult(result)
};

const updateStatusContactById = async (contactId, favorite) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  ifIsResult(updatedContact);
  console.log(updatedContact)
  return updatedContact;
};

module.exports = {
  getAll,
  getById,
  addContactToDB,
  updateContactById,
  deleteContactById,
  updateStatusContactById,
};

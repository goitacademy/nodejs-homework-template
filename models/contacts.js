const HttpError = require("../helpers/HttpError");
const { Contact } = require("../schemas/ValidateSchemasContacts");

const ifIsResult = (result) => {
  if (!result) {
    throw HttpError(404);
  }
};

const createdQueryObject = (contactId, owner) => {
  return { _id: contactId, owner };
};

const getAll = async ({ page = 1, limit = 20, ...other }, owner) => {
  const numberPage = parseInt(page, 10);
  const numberLimit = parseInt(limit, 10);
  if (!numberPage || !numberLimit) {
    throw HttpError(400, "Value must be a number");
  }
  const filters = { owner };
  if (other.favorite !== undefined) {
    filters.favorite = other.favorite;
  }

  const total = await Contact.count(filters);
  const skip = (numberPage - 1) * numberLimit;
  const contacts = await Contact.find(filters)
    .populate("owner", "email subscription")
    .skip(skip)
    .limit(numberLimit);
  return { contacts, page: numberPage, limit: numberLimit, total };
};

const getById = async (contactId, owner) => {
  const contact = createdQueryObject(contactId, owner);
  const searchedContact = await Contact.findOne(contact);
  ifIsResult(searchedContact);
  return searchedContact;
};

const addContactToDB = async (req) => {
  const { email } = req.body;
  const IfTakenEmail = await Contact.findOne({ email });
  if (IfTakenEmail) {
    throw HttpError(400, "Email is already taken");
  }
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  ifIsResult(newContact);
  return newContact;
};

const updateContactById = async (contactId, body, owner) => {
  const contact = createdQueryObject(contactId, owner);
  const updatedContact = await Contact.findOneAndUpdate(contact, body, {
    new: true,
  });
  ifIsResult(updatedContact);
  if (updatedContact.owner.toString() !== contact.owner.toString()) {
    throw HttpError(404, "Contact not found");
  }
  return updatedContact;
};

const deleteContactById = async (contactId, owner) => {
  const contact = createdQueryObject(contactId, owner);
  const result = await Contact.findOneAndRemove(contact);
  ifIsResult(result);
};

const updateStatusContactById = async (contactId, favorite, owner) => {
  const contact = createdQueryObject(contactId, owner);
  const updatedContact = await Contact.findOneAndUpdate(
    contact,
    { favorite },
    { new: true }
  );
  ifIsResult(updatedContact);
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

const HttpError = require("../helpers/HttpError");
const { Contact } = require("../schemas/ValidateSchemasContacts");

const ifIsResult = (result) => {
  if (!result) {
    throw HttpError(404);
  }
};

const getAll = async ({page = 1, limit = 20, favorite }, owner) => {
  const numberPage = parseInt(page, 10)
  const numberLimit = parseInt(limit, 10)
  if (!numberPage||!numberLimit) {
    throw HttpError(400, "Value must be a number")
  }
  const total = await Contact.count({owner}).where("favorite").equals(favorite);
  const skip = (numberPage - 1) * numberLimit;
  const contacts = await Contact.find({ owner })
    .where("favorite")
    .equals(favorite)
    .populate("owner", "email subscription")
    .skip(skip)
    .limit(numberLimit);
  ifIsResult(contacts);
  return { contacts, page: numberPage, limit: numberLimit, total };
};

const getById = async (contactId) => {
  const searchedContact = await Contact.findById(contactId);
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
  const newContact = (await Contact.create({ ...req.body, owner }));
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
  ifIsResult(result);
};

const updateStatusContactById = async (contactId, favorite) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
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

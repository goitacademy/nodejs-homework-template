const { HttpError } = require("../../utils/HttpError");
const { Contact } = require("../Contact");

const listContacts = async (userId, page, limit, favorite) => {
  const skip = (page - 1) * limit;
  const filter = { owner: userId };
  if (favorite === "true") {
    filter.favorite = true;
  }
  if (favorite === "fales") {
    filter.favorite = false;
  }

  return await Contact.find(filter).skip(skip).limit(limit);
};

const getContactById = async (userId, contactId) => {
  const contact = await Contact.findById({ owner: userId, _id: contactId });
  if (!contact) {
    throw new HttpError(404, "Contact not found");
  }
  return contact;
};

const removeContact = async (userId, contactId) => {
  const contact = await Contact.findByIdAndDelete({
    owner: userId,
    _id: contactId,
  });
  if (!contact) {
    throw new HttpError(404, "Contact not found");
  }
  return contactId;
};

const addContact = async (userId, body) => {
  return await Contact.create({ ...body, owner: userId });
};

const updateContact = async (userId, contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(
    {
      owner: userId,
      _id: contactId,
    },
    body,
    {
      new: true,
    }
  );
  if (!contact) {
    throw new HttpError(404, "Contact not found");
  }
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

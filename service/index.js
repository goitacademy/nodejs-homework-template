const { Contact } = require("./shemas/contact");

const listContacts = async (id, query) => {
  const { page = 1, limit = 10, favorite } = query;
  const skip = (page - 1) * limit;
  if (favorite) {
    return Contact.find({ id, favorite }, "", {
      skip: skip,
      limit: Number(limit),
    })
      .sort()
      .populate("owner", "_id email ");
  }
  return Contact.find({ id }, "", {
    skip: skip,
    limit: Number(limit),
  }).populate("owner", "_id email ");
};

const getContactById = async (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const addContact = async (body, id) => {
  return Contact.create({ ...body, owner: id });
};
const removeContact = async (contactId) => {
  return Contact.findOneAndDelete({ _id: contactId });
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};
const updateStatusContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

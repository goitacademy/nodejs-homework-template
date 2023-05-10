const Contact = require("./contacts");

const getAllContacts = async (queries) => {
  const pageNumber = parseInt(queries?.page);
  const perPage = parseInt(queries?.limit);
  const otherParamsObj = Object.fromEntries(
    Object.entries(queries).filter(
      ([key, value]) => !key.includes("page") && !key.includes("limit")
    )
  );
  return Contact.find(otherParamsObj)
    .skip(pageNumber > 0 ? (pageNumber - 1) * perPage : 0)
    .limit(perPage);
};
const getContactById = async (id, ownerId) => {
  return Contact.findOne({ _id: id, owner: ownerId });
};

const addContact = async ({ name, email, phone }, owner) => {
  return Contact.create({ name, email, phone, owner });
};

const updateContact = async (id, ownerId, fields) => {
  return Contact.findOneAndUpdate({ _id: id, owner: ownerId }, fields, {
    new: true,
  });
};

const removeContact = async (id, ownerId) => {
  return Contact.findOneAndRemove({ _id: id, owner: ownerId });
};
const updateStatusContact = async (id, ownerId, fields) => {
  return Contact.findOneAndUpdate({ _id: id, owner: ownerId }, fields, {
    new: true,
  });
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};

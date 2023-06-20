const Contact = require("./schemas/contacts");

const getAllContacts = async (owner, favorite, page, limit) => {
  const skip = (page - 1) * limit;

  if (favorite === "true") {
    return Contact.find({ owner, favorite: true }).skip(skip).limit(limit);
  }

  if (favorite === "false") {
    return Contact.find({ owner, favorite: false }).skip(skip).limit(limit);
  }

  return Contact.find({ owner }).skip(skip).limit(limit);
};

const getContactById = (id, owner) => {
  return Contact.findOne({
    _id: id,
    //FIXME: owner
  });
};

const createContact = ({ name, email, phone, favourite, owner }) => {
  return Contact.create({ name, email, phone, favourite, owner });
};

const updateContact = (id, fields, owner) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, owner, { new: true });
};

const removeContact = (id, owner) => {
  return Contact.findByIdAndRemove({ _id: id, owner });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};

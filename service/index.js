const Contact = require("./schemas/contacts");

const getAllContacts = async (owner, favourite, page, limit) => {
  const skip = (page - 1) * limit;

  if (favourite === "true") {
    return Contact.find({ owner, favourite: true }).skip(skip).limit(limit);
  }

  if (favourite === "false") {
    return Contact.find({ owner, favourite: false }).skip(skip).limit(limit);
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

const updateContact = (id, owner, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, owner, fields, { new: true });
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

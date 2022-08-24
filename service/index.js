const Contact = require("./schemas/contact.js");

const getAllContacts = () => Contact.find({}).lean();
const getContactById = (id) => Contact.findById(id);
const createContact = ({ name, email, phone }) =>
  Contact.create({ name, email, phone });
const removeContact = (id) => Contact.findByIdAndRemove(id);
const updateContact = ({ id, name, email, phone, favorite }) =>
  Contact.findByIdAndUpdate(id, { name, email, phone, favorite });

const updateFavourite = (id, fields) =>
  Contact.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: fields,
    },
    { new: true, strict: "throw", runValidators: true }
  );

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateFavourite,
};

const Contact = require("../../models/Contact");

const fetchContacts = () => Contact.find();

const fetchContact = (id) => Contact.findById(id);

const addContact = ({ name, email, phone }) => Contact.create({ name, email, phone });

const updateContact = async ({ id, toUpdate, upsert = false }) => {
  return Contact.findOneAndUpdate(
    { _id: id },
    { $set: toUpdate },
    { new: true, runValidators: true, strict: "throw", upsert }
  );
};

const updateStatusContact = async (id, favorite) => {
  return Contact.findOneAndUpdate({ _id: id }, { $set: favorite }, { new: true, runValidators: true, strict: "throw" });
};

const removeContact = (id) => Contact.deleteOne({ _id: id });

module.exports = { fetchContacts, fetchContact, addContact, updateContact, removeContact, updateStatusContact };

import { Contact } from "#models/Contact.js";

export const fetchContacts = () => Contact.find();

export const fetchContact = (id) => Contact.findById(id);

export const addContact = ({ name, email, phone }) => Contact.create({ name, email, phone });

export const updateContact = async ({ id, toUpdate, upsert = false }) => {
  return Contact.findOneAndUpdate(
    { _id: id },
    { $set: toUpdate },
    { new: true, runValidators: true, strict: "throw", upsert }
  );
};

export const updateStatusContact = async (id, favorite) => {
  return Contact.findOneAndUpdate({ _id: id }, { $set: favorite }, { new: true, runValidators: true, strict: "throw" });
};

export const removeContact = (id) => Contact.deleteOne({ _id: id });

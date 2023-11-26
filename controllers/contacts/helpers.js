import { Contact } from "#models/Contact.js";

export const dbFetchContacts = () => Contact.find().lean();
export const dbFetchContact = (id) => Contact.findById(id);
export const dbInsertContact = ({ name, email, phone, favorite }) =>
  Contact.create({ name, email, phone, favorite });
export const dbDeleteContact = (id) => Contact.findByIdAndDelete(id);
export const dbUpdateContact = (id, body) =>
  Contact.findOneAndUpdate(
    { _id: id },
    { $set: body },
    { new: true, runValidators: true, strict: "throw", upsert: true }
  );
export const dbUpdateStatusContact = async ({ id, toUpdate }) =>
  Contact.findOneAndUpdate({ _id: id }, { $set: toUpdate }, { new: true });

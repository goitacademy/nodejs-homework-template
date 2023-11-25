import { Contact } from "#models/Contact.js";

export const fetchContacts = () => Contact.find().lean();
export const fetchContact = (id) => Contact.findById(id);
export const insertContact = ({ name, email, phone, favorite }) =>
  Contact.create({ name, email, phone, favorite });
export const dbDeleteContact = (id) => Contact.findByIdAndDelete(id);
export const dbUpdateContact = (id, body) =>
  Contact.findOneAndUpdate(
    { _id: id },
    { ...body },
    { new: true, runValidators: true, strict: "throw", upsert: true }
  );

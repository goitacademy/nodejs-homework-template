import { Contact } from "#models/Contact.js";

export const fetchContacts = () => Contact.find().lean();
export const fetchContact = (id) => Contact.findById(id);
export const insertContact = ({ name, email, phone, favorite }) =>
  Contact.create({ name, email, phone, favorite });
export const removeContact = (id) => Contact.findByIdAndDelete(id);

import { Contact } from "#models/Contact.js";

export const fetchContacts = () => Contact.find().lean();
export const fetchContact = (id) => Contact.findById(id);

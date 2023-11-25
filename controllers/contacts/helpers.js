import { Contact } from "#models/Contact.js";

export const fetchContacts = () => Contact.find().lean();

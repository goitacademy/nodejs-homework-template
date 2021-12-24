import Contact from "../model/contactSchema";

const listContacts = async () => {
  const collection = await Contact.find();
  return collection;
};

export default listContacts;

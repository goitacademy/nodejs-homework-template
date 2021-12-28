import Contact from "../model/contactSchema";

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);
  return result;
};

export default removeContact;

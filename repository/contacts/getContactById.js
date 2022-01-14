import Contact from "../../model/contact";

export const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({ _id: contactId, owner: userId });
  return result;
};

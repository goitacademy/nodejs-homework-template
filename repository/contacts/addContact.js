import Contact from "../../model/contact";

export const addContact = async (userId, body) => {
  const result = await Contact.create({ ...body, owner: userId });
  return result;
};

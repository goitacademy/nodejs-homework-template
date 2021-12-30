import Contact from "../../model/contact";
const addContact = async (userId, body) => {
  const result = await Contact.create({ ...body, owner: userId });
  return result;
};
export default addContact;

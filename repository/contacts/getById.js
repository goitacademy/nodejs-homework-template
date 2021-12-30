import Contact from "../../model/contact";
const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);
  return result;
};
export default getContactById;
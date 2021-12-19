import contacts from "../../db/contacts.json";

const getContactById = async (contactId) => {
  try {
    const [contact] = contacts.filter((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

export default getContactById;

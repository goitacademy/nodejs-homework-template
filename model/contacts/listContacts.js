import contacts from "../../db/contacts.json";

const listContacts = async () => {
  try {
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

export default listContacts;

const listContacts = require("./listContacts");
const updateData = require("./updateData");

const { v4 } = require("uuid");

// console.log(v4());

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();

  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  // console.log(contacts);
  await updateData(contacts);

  return newContact;
};

module.exports = addContact;

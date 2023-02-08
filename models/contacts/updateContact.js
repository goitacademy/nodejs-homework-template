const getAllContacts = require("./getAllContacts");
const updateDataContacts = require("./updateDataContacts");

const updateContact = async (contactId, { name, email, phone }) => {
  const allContacts = await getAllContacts();

  const contactById = allContacts.find((contact) => contact.id === contactId);

  console.log(contactById);

  if (!contactById) {
    return null;
  }

  if (name) {
    contactById.name = name;
  } else if (email) {
    contactById.email = email;
  } else if (phone) {
    contactById.phone = phone;
  }

  await updateDataContacts(allContacts);

  return contactById;
};

module.exports = updateContact;

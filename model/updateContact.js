const { writeData, editContact } = require("./helpers");
const listContacts = require("./listContacts");
const validateContact = require("./validation");

const updateContact = async (contactId, body) => {
  if (contactId === void 0) {
    return { error: "Not found", status: 404 };
  }

  const contacts = await listContacts();
  const searchedIndex = await contacts.findIndex(
    ({ id }) => id.toString() === contactId.toString()
  );

  if (searchedIndex === -1) {
    return { error: "Not found", status: 404 };
  }

  const { error } = validateContact(body);

  if (error) {
    const { message } = error.details[0];
    return { error: message, status: 400 };
  }

  contacts[searchedIndex] = editContact(contacts[searchedIndex], {
    ...body,
  });

  await writeData(contacts);

  return contacts[searchedIndex];
};

module.exports = updateContact;

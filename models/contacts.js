const path = require("path");

const fs = require("fs/promises");

const contactsPath = path.resolve(__dirname, "contacts.json");

function Parcer(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

const listContacts = async () => {
  const data = await fs
    .readFile(contactsPath)
    .catch((e) => console.log(e.message));
  return Parcer(data);
};

const getContactById = async (contactId) => {
  const data = await fs
    .readFile(contactsPath)
    .catch((e) => console.log(e.message));

  const contactFound = Parcer(data).find((item) => item.id === contactId);

  if (contactFound) return contactFound;
  else return null;
};

const removeContact = async (contactId) => {
  const data = await fs
    .readFile(contactsPath)
    .catch((e) => console.log(e.message));

  const contactFound = Parcer(data).find((item) => item.id === contactId);

  if (contactFound) {
    const filteredArray = Parcer(data).filter((item) => item.id !== contactId);

    await fs
      .writeFile(contactsPath, JSON.stringify(filteredArray))
      .catch((e) => console.log(e.message));
    return contactFound;
  } else return null;
};

const addContact = async (newContact) => {
  const data = await fs
    .readFile(contactsPath)
    .catch((e) => console.log(e.message));

  const updatedArr = [...Parcer(data), newContact];

  await fs
    .writeFile(contactsPath, JSON.stringify(updatedArr))
    .catch((e) => console.log(e.message));
  return newContact;
};

const updateContact = async (contactId, newUpdatedData) => {
  const data = await fs
    .readFile(contactsPath)
    .catch((e) => console.log(e.message));

  const contactFoundIndex = Parcer(data).findIndex(
    (item) => item.id === contactId
  );

  if (contactFoundIndex !== -1) {
    const contactFound = Parcer(data).find((item) => item.id === contactId);
    const filteredArr = Parcer(data).filter((item) => item.id !== contactId);

    const updatedContact = {
      ...contactFound,
      ...newUpdatedData,
    };

    const updatedArr = [...filteredArr, updatedContact];

    await fs
      .writeFile(contactsPath, JSON.stringify(updatedArr))
      .catch((e) => console.log(e.message));
    return updatedContact;
  } else return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

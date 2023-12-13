
const listContacts = async () => {
  // implementation
};

const getContactById = async (contactId) => {
  // implementation
};

const removeContact = async (contactId) => {
  // implementation
};

const addContact = async (body) => {
  const newContact = {
    // create new contact
  };
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  // update the contacts
  return contacts[index];
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

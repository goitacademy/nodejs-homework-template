const { contacts } = require("./data");

const listContacts = jest.fn((userId, query) => {
  const { limit = "5", offset = "0" } = query;
  return {
    contacts,
    total: contacts.length,
    limit,
    offset,
    // page,
  };
});

const getContactById = jest.fn((contactId, _userId) => {
  const [contact] = contacts.filter(
    (el) => String(el._id) === String(contactId)
  );

  return contact;
});

const addContact = jest.fn((body) => {
  contacts.push({
    ...body,
    _id: "608720b609a09914684fc62d",
  });

  return {
    ...body,
    _id: "608720b609a09914684fc62d",
  };
});

const updateContact = jest.fn((contactId, body, userId) => {
  let [contact] = contacts.filter((el) => String(el._id) === String(contactId));

  if (contact) {
    contact = { ...contact, ...body };
  }
  return contact;
});

const removeContact = jest.fn((contactId, userId) => {
  const index = contacts.findIndex(
    (el) => String(el._id) === String(contactId)
  );
  if (index === -1) {
    return null;
  }
  const [contact] = contacts.splice(index, 1);
  return contact;
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

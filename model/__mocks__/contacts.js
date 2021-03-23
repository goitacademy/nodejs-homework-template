const { contacts } = require('./data');

const listContacts = jest.fn(
  (userId, { sortBy, sortByDesc, filter, limit = '5', page = '1' }) => {
    return { contacts, total: contacts.length, limit, page };
  },
);

const getContactById = jest.fn(id => {
  const [contact] = contacts.filter(el => String(el._id) === String(id));
  return contact;
});

const addContact = jest.fn(body => {
  const newContact = { ...body, _id: '5eb074232c30a1378dacdbda' };
  contacts.push(newContact);
  return newContact;
});

const updateContact = jest.fn((contactId, body, userId) => {
  let [contact] = contacts.filter(el => String(el._id) === String(contactId));
  if (contact) {
    contact = { ...contact, ...body };
  }
  return contact;
});

const removeContact = jest.fn(contactId => {
  const index = contacts.findIndex(el => String(el._id) === String(contactId));
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

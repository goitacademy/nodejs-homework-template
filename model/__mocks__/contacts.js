const { contacts } = require('./data');

// eslint-disable-next-line no-undef
const listContacts = jest.fn(
  (userId, { sortBy, sortByDesc, sub, page = '1', limit = '20' }) => {
    return { total: contacts.length, page, limit, contacts };
  },
);

// eslint-disable-next-line no-undef
const getContactById = jest.fn((contactId, userId) => {
  const [contact] = contacts.filter(el => String(el._id) === String(contactId));
  return contact;
});

// eslint-disable-next-line no-undef
const addContact = jest.fn(body => {
  const newContact = { ...body, _id: '5a378c5640e639.6545464915135898462658' };
  contacts.push(newContact);
  return newContact;
});

// eslint-disable-next-line no-undef
const updateContact = jest.fn((contactId, body, userId) => {
  let [contact] = contacts.filter(el => String(el._id) === String(contactId));
  if (contact) {
    contact = { ...contact, ...body };
  }
  return contact;
});

// eslint-disable-next-line no-undef
const removeContact = jest.fn((contactId, userId) => {
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
  addContact,
  updateContact,
  removeContact,
};
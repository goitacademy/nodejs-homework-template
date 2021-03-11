const { contacts } = require('./data');

const getAll = jest.fn(
  (userId, { sortBy, sortByDesc, sub, limit = '5', offset = '0' }) => {
    return { contacts, total: contacts.length, limit, offset };
  }
);

const getById = jest.fn((contactId, userId) => {
  const [contact] = contacts.filter((el) => String(el._id) === String(userId));
  return contact;
});

const remove = jest.fn((contactId, userId) => {
  const index = contacts.findIndex(
    (el) => String(el._id) === String(contactId)
  );
  if (index === -1) {
    return null;
  }
  const [contact] = contacts.splice(index, 1);
  return contact;
});

const create = jest.fn((body) => {
  const newContact = { ...body, _id: '5f8382425ba83a4f1829ca5d' };
  contacts.push(newContact);
  return newContact;
});

const update = jest.fn((contactId, body, userId) => {
  let [contact] = contacts.filter((el) => String(el._id) === String(contactId));
  if (contact) {
    contact = { ...contact, ...body };
  }
  return contact;
});

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};

const { contacts } = require("./data.js");

//userId - можно доделать самому добавив owner в файковую базу и фольтруя по нему
const getAll = jest.fn(
  (userId, { limit = 5, page = 1, sortBy, sortByDesk, filter, favorite }) => {
    return { contacts, total: contacts.length, limit, page };
  }
);

const getById = jest.fn((userId, id) => {
  const [contact] = contacts.filter((el) => String(el._id) === String(id));
  return contact;
});

const create = jest.fn((userId, body) => {
  const newContact = { ...body, _id: "2fgdsfsdfdsa" };
  contacts.push(newContact);
  return newContact;
});

const update = jest.fn((userId, id, body) => {
  const [contact] = contacts.filter((el) => String(el._id) === String(id));
  if (contact) {
    contact = { ...contact, ...body };
  }
  return contact;
});

const remove = jest.fn((userId, id) => {
  const index = contacts.findIndex((el) => String(el._id) === String(id));
  if (index === -1) {
    return null;
  }
  const [contact] = contacts.splice(index, 1);
  return contact;
});

module.exports = { getAll, getById, remove, create, update };

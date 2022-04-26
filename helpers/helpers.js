const { nanoid } = require('nanoid');

const generateNewId = contacts => {
  let id = '';
  do {
    id = nanoid();
  } while (findIndex(contacts, id));
  return id;
};

const findIndex = (data, id) => {
  const index = data.findIndex(item => item.id === id);
  return index !== -1 ? index : null;
};

module.exports = { findIndex, generateNewId };

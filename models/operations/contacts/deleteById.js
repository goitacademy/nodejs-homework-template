const fs = require('fs/promises');
const getAll = require('./getAll');
const contactsPath = require('../../contactsPath');

const deleteById = async id => {
  const data = await getAll();
  const contactToReturn = data.filter(el => el.id === id);

  if (!contactToReturn.length) {
    return null;
  }

  const contactsToRewrite = data.filter(el => el.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(contactsToRewrite));
  return contactToReturn;
};

module.exports = deleteById;

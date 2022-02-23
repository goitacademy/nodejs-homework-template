const { readContent, writeContent, contactsPath } = require('../../utils');

const removeContact = async (contactId) => {
  const content = await readContent();
  const newContent = content.filter(({ id }) => id !== contactId);
  await writeContent(newContent, contactsPath);
};

module.exports = { removeContact };

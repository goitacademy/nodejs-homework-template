const { readContent, writeContent, contactsPath } = require('../../utils');

const updateContact = async (contactId, body) => {
  const content = await readContent();
  const updatedContact = content.reduce((acc, item) => {
    if (item.id === contactId) {
      acc = { ...item, ...body };
    }
    return acc;
  }, {});
  const newContent = content.filter(({ id }) => id !== contactId);
  newContent.push(updatedContact);
  await writeContent(newContent, contactsPath);
  return updatedContact;
};

module.exports = { updateContact };

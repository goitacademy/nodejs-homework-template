const { writeContent, readContent, contactsPath } = require('../../utils');

const addContact = async (body) => {
  const content = await readContent();
  content.push(body);
  await writeContent(content, contactsPath);
};

module.exports = { addContact };

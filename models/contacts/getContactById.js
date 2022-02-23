const { readContent } = require('../../utils');

const getContactById = async (contactId) => {
  const content = await readContent();

  return content.find(({ id }) => id === contactId) || false;
};

module.exports = { getContactById };

const { readContent } = require('../content');

async function isExistUserById(userId) {
  const content = await readContent();
  return !!content.filter(({ id }) => id === userId).length;
}

module.exports = {
  isExistUserById,
};

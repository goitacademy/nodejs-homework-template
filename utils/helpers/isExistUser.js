const { readContent } = require('../content');

async function isExistUser(user) {
  const content = await readContent();
  const normalizeName = user.name.toLowerCase();
  const isFinding = content.filter(
    ({ name, phone, email }) =>
      name.toLowerCase() === normalizeName ||
      phone.includes(user.phone) ||
      email === user.email
  );

  if (Object.keys(isFinding).length) {
    return true;
  }
  return false;
}

module.exports = {
  isExistUser,
};

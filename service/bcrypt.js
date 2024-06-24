const bcrypt = require('bcryptjs');
const saltRounds = 10;
const plainTextPassword = input => input;

const passwordHashBcypt = async pass =>
  await bcrypt.hash(plainTextPassword(pass), saltRounds).then(hash => hash);

const passwordCompareBcrypt = async (inputPass, dbPass) => {
  const match = await bcrypt.compare(inputPass, dbPass);
  return match;
};

module.exports = { passwordHashBcypt, passwordCompareBcrypt };
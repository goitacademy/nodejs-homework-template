const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const result = bcrypt.hash(password, 10);

  return result;
}

module.exports = hashPassword;

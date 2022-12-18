const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const result = bcrypt.hash(password, 10);

  console.log(result);

  return result;
}

module.exports = hashPassword;

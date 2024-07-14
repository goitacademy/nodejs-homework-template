const bcrypt = require("bcryptjs");

const createHashPassword = async (value) => {
  const result = await bcrypt.hash(value, 10);
  return result;
};

const compareResult = async (value, hashValue) => {
  return await bcrypt.compare(value, hashValue);
};

module.exports = { createHashPassword, compareResult };

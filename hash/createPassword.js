const bcrypt = require("bcrypt");

const createPassword = async (password) => {
  const result = await bcrypt.hash(password, 10);
  //   const compareResult = await bcrypt.compare(password, result);

  return result;
};
module.exports = createPassword;

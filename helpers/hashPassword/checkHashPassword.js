const bcrypt = require("bcryptjs");

const checkHashPassword = async (enterPasswor, userHashPassword) => {
  const compareResult = await bcrypt.compare(enterPasswor, userHashPassword);

  return compareResult;
};

module.exports = checkHashPassword;

const { nanoid } = require('nanoid');

const generateEmailToken = async () => {
  const verifyCode = await nanoid();
  return verifyCode;
};

module.exports = generateEmailToken();
const { v4: uuidv4 } = require("uuid");

const generateVerificationToken = () => {
  return uuidv4(); // Wygeneruj unikalny token
};

module.exports = {
  generateVerificationToken,
};
const { v4: uuidv4 } = require('uuid');

// Function to generate a verification token for a user
function generateVerificationToken() {
  return uuidv4();
}

module.exports = generateVerificationToken;
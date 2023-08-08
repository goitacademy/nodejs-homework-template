const bcrypt = require("bcrypt");

class InvalidInputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidInputError';
  }
}

const { getUserByEmail } = require("../controllers/users");
const issueToken = require("./issueToken");

const loginHandler = async (email, incomingPassword) => {
  const user = await getUserByEmail(email);

  const userPassword = user.password;

  const result = bcrypt.compareSync(incomingPassword, userPassword);

  if (result) {
    return issueToken(user);
  } else {
    throw new InvalidInputError('Invalid credentials');
  }
};

module.exports = loginHandler;

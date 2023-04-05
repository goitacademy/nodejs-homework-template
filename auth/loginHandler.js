const bcrypt = require("bcrypt");

const { getUserByEmail } = require("../controllers/users");
const issueToken = require("./issueToken");

const loginHandler = async (email, incomingPassword) => {
  const user = await getUserByEmail(email);

  if (!user) {
    // eslint-disable-next-line no-throw-literal
    throw { code: 404, msg: "User not found" };
  }

  const userPassword = user.password;

  const result = bcrypt.compareSync(incomingPassword, userPassword);

  if (result) {
    return issueToken(user);
  } else {
    // eslint-disable-next-line no-throw-literal
    throw { code: 401, msg: "Invalid credentials" };
  }
};

module.exports = loginHandler;

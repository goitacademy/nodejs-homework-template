const bcrypt = require("bcrypt");

const { getUserByEmail, updateTokenStatus } = require("../controllers/users");
const issueToken = require("./issueToken");

const loginHandler = async (email, incomingPassword) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw { code: 404, msg: "User not found!!!" };
  }
  const userPassword = user.password;
  const result = bcrypt.compareSync(incomingPassword, userPassword);

  if (result) {
    const token = issueToken(user);
    const updatedUser = await updateTokenStatus(user._id.valueOf(), token);
    return updatedUser;
  } else {
    throw { code: 401, msg: "Invalid credentials" };
  }
};

module.exports = { loginHandler };

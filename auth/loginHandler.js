const bcrypt = require("bcrypt");

const { checkEmail, checkUserByIdAndUpdate } = require("../models/user");
const issueToken = require("./issueToken");

const loginHandler = async (email, incomingPassword) => {
  const user = await checkEmail({ email });

  if (user === null) {
    return res.status(404).send("User not found");
  }
  const userPassword = user.password;
  const result = bcrypt.compareSync(incomingPassword, userPassword);
  if (result) {
    const token = issueToken(user);
    const findAndUpdate = await checkUserByIdAndUpdate(user.id, {
      token: token,
    });

    return token;
  } else {
    return res.status(401).send("Invalid credentials");
  }
};

module.exports = loginHandler;

const bcrypt = require("bcrypt");

const { checkEmail } = require("../models/user");

const loginHandler = async (email, incomingPassword) => {
  const user = await checkEmail({ email });

  if (incomingPassword === user.password) {
    console.log("Hasła ok");
  } else {
    console.log("Hasła złe");
  }

  if (!user) {
    throw "User not found";
  }

  const userPassword = user.password;

  const result = bcrypt.compareSync(incomingPassword, user.password);

  console.log(result);

  return result;
};

module.exports = loginHandler;

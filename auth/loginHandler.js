const bcrypt = require("bcrypt");

const { getUserByemail, updateToken } = require("../controllers/users");
const { verifyToken, issueToken } = require("./tokenUtils"); // Załóżmy, że masz oddzielną funkcję do obsługi tokenów

const loginHandler = async (email, incomingPassword) => {
  try {
    const user = await getUserByemail(email);

    if (!user) {
      throw new Error("User not found!");
    }

    const userPassword = user.password;
    const passwordMatch = await bcrypt.compare(incomingPassword, userPassword);

    if (passwordMatch) {
      const token = issueToken(user);
      const updateUser = await updateToken(user._id, token);
      return updateUser;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

module.exports = loginHandler;

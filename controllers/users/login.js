const bcrypt = require("bcryptjs");

const getUserByEmail = require("../../service/users/getUserByEmail.js");
const generateToken = require("../../helpers/generateToken.js");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Validation error" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = generateToken(user._id);

    user.token = token;
    await user.save();

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {login};

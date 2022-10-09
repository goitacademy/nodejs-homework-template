const bcrypt = require("bcrypt");
const { User } = require("../../service");
const RequestError = require("../../helpers/RequestError");

const registerUser = async (req, res) => {
  const { email, password, subscription } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  
    const user = await User.findOne({ email });
    if (user) {
      throw RequestError(409, "Email in use");
    } else {
      const newUser = await User.create({
        email,
        password: hashPassword,
        subscription,
      });
      res.status(201).json({
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      });
    }

};
module.exports = registerUser;

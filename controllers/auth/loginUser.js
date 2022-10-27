const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../service");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { RequestError } = require("../../helpers");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Email not found");
  }
  if (!user.verify) {
    throw RequestError(401, "Not verification ");
  } else {
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw RequestError(401, "Email or password is wrong");
    } else {
      const payload = {
        id: user._id,
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
      await User.findByIdAndUpdate(user._id, { token });
      res.status(200).json({
        code: 200,
        status: "success",
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    }
  }
};
module.exports = loginUser;

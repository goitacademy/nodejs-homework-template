const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../service");
const { SECRET_KEY } = process.env;

// const { RequestError } = require("../../helpers/RequestError");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  //   const hashPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // throw RequestError(401, Email not found);
      res.status(401).json({
        message: "Email not found",
      });
    } else {
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        // throw RequestError(401, Password wrong);
        res.status(401).json({
          message: "Email or password is wrong",
        });
      } else {
        const payload = {
          id: user._id,
        };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
        await User.findByIdAndUpdate(user._id, { token });
        res.status(200).json({
          token,
          user: {
            email: user.email,
            subscription: user.subscription,
          },
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
module.exports = loginUser;

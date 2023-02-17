const {RequestError} = require("../../helpers");

const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.comparePassword(password)) {
      throw new RequestError(400, "Email or password is wrong");
    }
    

    if (!user.verify) {
      throw new RequestError(400, "Email is not verify");
    }

    const payload = {
      id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    
    res.json({
      status: "success",
      code: 200,
      token: token,
      user: { email: user.email,   subscription: user.subscription },
    });

  } catch (error) {
    next(error);
  }
};

module.exports = login;

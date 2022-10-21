const { User, schemas } = require("../../models/users");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "1sa3fdj63op99";

const login = async (req, res, next) => {
  try {
    const { error } = schemas.usersPostSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw RequestError(401, "Email or password is wrong");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw RequestError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    await User.findOneAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;

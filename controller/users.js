const User = require("../service/schemas/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const secret = "goit";

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 401,
      data: "Bad request",
      message: "Incorrect login/password",
    });
  }
  try {
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    user.token = token;
    user.save();

    return res.json({
      status: "success",
      code: 200,
      data: { token },
    });
  } catch (e) {
    return res.json.status(400).send(e.message);
  }
};

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "Email in use",
    });
  }
  try {
    const newUser = new User({ username, email });
    newUser.setPassword(password);

    const payload = {
      id: newUser.id,
    };
    newUser.token = jwt.sign(payload, secret, { expiresIn: "1h" });
    await newUser.save();
    return res.json({
      status: "success",
      code: 201,
      data: {
        message: "Register completed",
      },
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const logout = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
    }

    req.user = user;
    const { id } = req.user;
    const currentUser = await User.findOne({ _id: id });

    currentUser.token = null;
    await currentUser.save();
    try {
      await currentUser.save();
      return res.json({
        status: "success",
        code: 204,
      });
    } catch (e) {
      return res.status(401).send(e.message);
    }
  })(req, res, next);
};

const getCurrent = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
    }

    req.user = user;
    const { id } = req.user;

    const currentUser = await User.findOne({ _id: id });

    if (currentUser.token === null) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
    }

    currentUser.token = req.token;
    await currentUser.save();
    res.json({
      status: "success",
      code: "200",
      data: {
        email: currentUser.email,
        subscription: currentUser.subscription,
      },
    });
  })(req, res, next);
};

module.exports = {
  login,
  register,
  logout,
  getCurrent,
};

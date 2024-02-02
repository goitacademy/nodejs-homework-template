const service = require("../service/userService");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const { validateUser } = require("../tools/userValidator");

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await service.findUserByEmail({email});
  const { error } = await validateUser({ email, password });
  if (error) {
    console.log(error);
    return res.json({ status: 400, msg: "Missing fields" });
  }

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      msg: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = await service.signUpNewUser(email, password);
    res.json({
      status: 201,
      msg: "Create new user",
      data: { email: newUser.email, subscription: "starter" },
    });
  } catch (error) {
    next(error);
  }
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = await validateUser({ email, password });
  try {
    if (error) {
      console.log(error);
      return res.json({ status: 400, msg: "Missing fields" });
    }
    const user = await service.findUserByEmail({email});

    if (!user || !user.validPassword(password)) {
      return res.status(400).json({
        status: "error",
        code: 400,
        msg: "Email or password is wrong",
        data: "Bad request",
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
      subscription: user.subscription,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    await service.findUserByIdAndUpdate(user.id, { token });
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
      msg: `Login successful. ${user.email}`,
    });
    } catch(error) {
      next(error);
    }  
};

const logOut = async (req, res, next) => {
  const { id } = req.user;
  try {
    await service.findUserByIdAndUpdate(id, { token: null });
    res.status(204).json({ status: "No content" });
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  const { email, subscription } = req.user;
  try {
    res.status(200).json({
      status: "OK",
      body: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  logIn,
  logOut,
  current,
}
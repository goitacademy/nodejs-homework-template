const { patternUserAdd, patternUserPatch } = require("../joi");
const service = require("../service/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;
const { User } = require("../service/schemas/users");

const add = async (req, res, next) => {
  const body = req.body;
  const { password, email } = req.body;
  const validated = patternUserAdd.validate(body);
  const checkEmail = await service
    .findUser({ email: validated.value.email })
    .lean();
  if (checkEmail && body) {
    return res.json({ message: "Email in use", status: "failed", code: 409 });
  }
  if (validated.error) {
    return res.json({
      message: validated.error.message,
      status: "failed",
      code: 400,
    });
  }
  try {
    const newUser = new User({ email });
    await newUser.setPassword(password);
    await newUser.save();
    res.json({
      user: { email: newUser.email, subscription: "starter" },
      status: "success",
      code: 201,
    });
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  const body = req.body;
  const { password } = body;
  const validated = patternUserAdd.validate(body);
  if (validated.error) {
    return res.json({
      message: validated.error.message,
      status: "failed",
      code: 400,
    });
  }
  const checkEmail = await service.findUser({ email: validated.value.email });
  const isCorrectPassword = await checkEmail.validatePassword(password);
  if (!checkEmail || !isCorrectPassword) {
    return res.json({
      message: "Wrong credentials",
      status: "failed",
      code: 400,
    });
  }
  try {
    const payload = { id: checkEmail._id, email: checkEmail.email };
    const token = jwt.sign(payload, SECRET, { expiresIn: "4h" });
    checkEmail.token = token;
    checkEmail.save();
    res.json({
      token: token,
      user: { email: checkEmail.email, subscription: "starter" },
      status: "success",
      code: 200,
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const delToken = await service.findUser({ _id: req.user.id });
    delToken.token = null;
    delToken.save();
    res.json({ status: "success", code: 204 });
  } catch (err) {
    next(err);
  }
};

const check = async (req, res, next) => {
  const {email, subscription, id} = req.user;
  try{
    const user = await service.findUser({_id: id});
    if(user)
    {res.json({data: {email, subscription}, status: "success", code: 200})}
  } catch(err) {next(err)}
};

const subs = async (req, res, next) => {
  const {_id} = req.user;
  const body = req.body;
  const validated = patternUserPatch.validate(body);
  if(validated.error) {return res.json({message: validated.error.message, status: "failed", code: 400})}
  try{
  const user = await service.findUser({_id});
  user.subscription = body.subscription;
  user.save();
  res.json({message: `Subscription has changed for ${body.subscription}`, status: "success", code: 201})
  } catch(err) {next(err)}
};

module.exports = {
  add,
  get,
  logout,
  check,
  subs
};

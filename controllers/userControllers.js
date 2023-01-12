const {
  BadRequest,
  Conflict,
  Unauthorized,
} = require("../helpers/errors");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateSubscription,
} = require("../services/usersService");

const registerUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const register = await registerUser(email, password);
    res.status(201).json({ register });
  } catch (error) {
    throw new Conflict();
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const login = await loginUser(email, password);
  if (!login) {
    throw new Unauthorized("Email or password is wrong");
  }
  res.json({ login });
};

const logoutUserController = async (req, res) => {
  const { _id } = req.user;
  await logoutUser(_id);
  res.status(204).json({});
};

const currentUserController = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateSubscriptionController = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  if (!subscription) {
    throw new BadRequest("missing field subscription");
  }
  const update = await updateSubscription(_id, subscription);
  if (!update) {
    throw new BadRequest(
      "subscription can be only ['starter', 'pro', 'business']"
    );
  }
  res.json({ message: `subscription updated to: ${subscription}` });
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  updateSubscriptionController,
};

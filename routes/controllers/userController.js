const {
  registration,
  login,
  getCurrent,
  logout,
  addToken,
  updateSubscription,
} = require("../services/userServices");

const userRegistration = async (req, res) => {
  const { email, password } = req.body;
  await registration(email, password);
  res.status(201).json({
    status: "Created",
    code: 201,
    data: {
      user: { email, subscription: "starter" },
    },
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  await addToken(email, token);
  res.status(200).json({
    status: "Ok",
    code: 200,
    data: {
      user: { email, subscription: "starter", token },
    },
  });
};

const userGetCurrent = async (req, res) => {
  const { id } = req.user;
  const user = await getCurrent(id);
  const { email, subscription } = user;
  res.status(200).json({
    status: "Ok",
    code: 200,
    data: {
      user: { email, subscription },
    },
  });
};

const userLogOut = async (req, res) => {
  const { id } = req.user;
  await logout(id);
  res.status(204).json();
};

const userSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;
  await updateSubscription(id, subscription);
  res.json({ status: "success" });
};

module.exports = {
  userRegistration,
  userLogin,
  userGetCurrent,
  userLogOut,
  userSubscription,
};

const { Unauthorized } = require("http-errors");
const {
  registration,
  login,
  getCurrent,
  logout,
  addToken,
  deleteUser,
  updateSubscription,
  updateAvatar,
  verificationByToken,
  userSendEmailAgain,
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

const userDelete = async (req, res) => {
  const { userId } = req.params;
  const { id } = req.user;
  if (userId !== id) {
    throw new Unauthorized("User is not authorized");
  }
  const result = await deleteUser(userId);
  res.json({
    status: "success",
    code: 200,
    message: "User deleted",
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

const userAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { id } = req.user;
  const result = await updateAvatar(id, tempUpload, originalname);
  const { avatarURL } = result;
  res.status(200).json({ status: "Ok", code: 200, data: { avatarURL } });
};

const userVerification = async (req, res) => {
  const { verificationToken } = req.params;
  await verificationByToken(verificationToken);
  res.status(200).json({ status: "Verification successful" });
};
const userSendSecondEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "missing required field email" });
  }
  await userSendEmailAgain(email);
  res.status(200).json({ status: "Verification email sent" });
};

module.exports = {
  userRegistration,
  userLogin,
  userGetCurrent,
  userLogOut,
  userDelete,
  userSubscription,
  userAvatar,
  userVerification,
  userSendSecondEmail,
};

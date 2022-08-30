const {
  addUser,
  loginUser,
  logOut,
  getUser,
  updateSubscription,
  changeAvatar,
  findUserByVerificationToken,
} = require("../models/users");

async function signUpUser(req, res) {
  try {
    const user = await addUser(req.body);
    res
      .status(201)
      .json({ email: user.email, subscription: user.subscription });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
}

async function logInUser(req, res) {
  const user = await loginUser(req.body);
  res.status(200).json({
    token: user.token,
    user: { email: user.email, subscription: user.subscription },
  });
}
async function logOutUser(req, res) {
  await logOut(req.userId);
  res.status(204).json({ message: "No Content" });
}
async function getCurrentUser(req, res) {
  const user = await getUser(req.userId);
  res.status(200).json({ email: user.email, subscription: user.subscription });
}
async function updateUserSubscription(req, res) {
  const user = await updateSubscription(req.body, req.userId);
  res.status(200).json({ email: user.email, subscription: user.subscription });
}

async function changeUseravatar(req, res) {
  const user = await changeAvatar(req, req.userId);
  res.status(200).json({ avatarURL: user.avatarURL });
}

async function getUserByVerificationToken(req, res) {
  const { verificationToken } = req.params;
  const user = await findUserByVerificationToken(verificationToken);
  if (!user) {
    res.status(404).json({ message: `User not found` });
    return;
  }
  res.status(200).json({ message: "Verification successful" });
}

module.exports = {
  signUpUser,
  logInUser,
  logOutUser,
  getCurrentUser,
  updateUserSubscription,
  changeUseravatar,
  getUserByVerificationToken,
};

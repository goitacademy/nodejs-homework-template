const {
  registration,
  logIn,
  logOut,
  verification,
} = require("../services/authServices");

const registrationController = async (req, res) => {
  const { email, subscription, avatarURL } = await registration(req.body);

  res.status(201).json({
    message: "New user has been created!",
    status: "created",
    code: "201",
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

const logInController = async (req, res) => {
  const { email, password } = req.body;

  const { token, user } = await logIn(email, password);

  res.status(200).json({
    status: "success",
    code: "200",
    token,
    user,
  });
};

const logOutController = async (req, res) => {
  const { _id } = req.user;

  await logOut(_id);

  res.status(200).json({ message: "Logout successful" });
};

const verificationController = async (req, res) => {
  await verification(req.params);

  res.status(200).json({
    status: "200 OK",
    message: "Verification successful",
  });
};

module.exports = {
  registrationController,
  logInController,
  logOutController,
  verificationController,
};

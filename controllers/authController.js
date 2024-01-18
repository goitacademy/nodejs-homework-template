const { signup, login, logout, updateSubscription, uploadFile, updateAvatarPath, checkVerificationToken, checkEmailForResendVerification } = require("../services");
// const path = require("path");

exports.signup = async (req, res, next) => {
  const { user, token } = await signup(req.body);

  res.status(201).json({ message: "Success", user, token });
};

exports.login = async (req, res) => {
  const { user, token } = await login(req.body);

  res.status(200).json({
    message: "Success",
    user,
    token,
  });
};

exports.logout = async (req, res) => {
  const user = await logout(req.user);

  res.status(204).json({
    message: "Success",
    user,
  });
};

exports.current = async (req, res) => {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};

exports.updateSubscription = async (req, res) => {
  const updatedUser = await updateSubscription(req.body, req.user);
  res.status(201).json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

exports.uploadAvatar = async (req, res, next) => {
  const { path: temporaryName, originalname } = req.file;
  try {
    const uploadedFileName = await uploadFile(temporaryName, originalname, req.user._id);
    await updateAvatarPath(req.user, uploadedFileName);
    res.status(200).json({
      avatarURL: uploadedFileName,
    });
  } catch (error) {
    next(error);
  }
};

exports.userOfVerification = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    await checkVerificationToken(verificationToken);

    res.status(200).json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

exports.checkResentVerification = async (req, res, next) => {
  const emailForVerification = req.body.email;
  try {
    await checkEmailForResendVerification(emailForVerification);

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

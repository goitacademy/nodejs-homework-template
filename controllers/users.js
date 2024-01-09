const { ctrlWrapper, HttpError } = require("../helpers"); // імпортуємо помилку для прокидування
const { User } = require("../models/user");

const { contactServices } = require("../services");

const { SECRET_KEY } = process.env;

/**
 * @призначення для регістриції користувача
 */
const registerUser = async (req, res, next) => {
  const { email, password, subscription } = await contactServices.signup(
    req.body
  );

  res.status(201).json({
    user: {
      email: email,
      password: password,
      subscription: subscription,
    },
  });
};

// коли користувач в поштовому язику заходить по ссилку для підтверження емейлу, то викликається цей роутер
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(401, "Email found");
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });

  res.status(200).json({
    message: "Email verify success",
  });

}

// для повторної відправки емейлу
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email not found");
  }

  if (user.verify) {
    res.sendStatus(404);
    // throw HttpError(401, "Email already verify");
  }

   const verifyEmail = {
     to: email,
     subject: "Verify email",
     html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
   };

   await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send success"
  })
}

/**
 * @призначення для авторизації користувача
 * ///
 */

const loginUser = async (req, res, next) => {
  const { user, token } = await contactServices.login(
    req.body.email,
    req.body.password
  );

  res.status(200).json({
    ResponseBody: {
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

const logoutUser = async (req, res, next) => {
  const { msg } = await contactServices.logOut(req.user);

  res.json({
    message: msg,
  });
};

const getCurrentUser = async (req, res, next) => {
  const { email, subscription } = await contactServices.getCurrent(req.user);

  res.json({
    email: email,
    subscription: subscription,
  });
};

const updateUserSubscription = async (req, res, next) => {
  const { email, subscription } = await contactServices.updateSubscription(
    req.user,
    req.body
  );

  res.status(200).json({
    email: email,
    subscription: subscription,
  });
};

const updateUserAvatar = async (req, res, next) => {
  if (!req.file) throw HttpError(400);

  const { avatarURL } = await contactServices.updateAvatar(req.user, req.file);

  res.status(200).json({
    avatarURL: avatarURL,
  });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};

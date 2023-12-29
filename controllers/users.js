const { ctrlWrapper, HttpError } = require("../helpers"); // імпортуємо помилку для прокидування

const { contactServices } = require("../services");

const { SECRET_KEY } = process.env;

/**
 * @призначення для регістриції користувача
 */
const registerUser = async (req, res, next) => {
  const { email, password, subscription } = await contactServices.signup(req.body);

  res.status(201).json({
    user: {
      email: email,
      password: password,
      subscription: subscription,
    },
  });
};

/**
 * @призначення для авторизації користувача
 */

const loginUser = async (req, res, next) => {
  const { user, token } = await contactServices.login(req.body.email, req.body.password);

  res.status(200).json({
    ResponseBody: {
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });

}

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
  const { email, subscription } = await contactServices.updateSubscription(req.user, req.body);
 
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
};

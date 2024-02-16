const { ctrlWrapper, HttpError } = require("../helpers");
// імпортую модель
const { User } = require("../models/user");
const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;

//   if (!["starter", "pro", "business"].includes(subscription)) {
//     throw HttpError(404, "Invalid subscription value");
//   }
  const result = await User.findByIdAndUpdate( id , {subscription}, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json( result );
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  console.log("verificationToken", verificationToken);
  // відправляю запит на mongoDB та шукаю юзера з таким токеном
  const user = await User.findOne({ verificationToken });
  console.log("user", user);
  // перевіряю чи є юзер з таким токеном
  if (!user) {
    throw HttpError(404, "User not found");
  }
  // оновлюємо юзера та підтверджуємо верифікацію
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  // відправляємо повідомлення що верифікація пройдена

  res.status(200).json({
    message: "Verification successful",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw HttpError(400, "missing required field email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(401, "Verification has already been passed");
  }
  // знов створюємо емейл на підтвердження
  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click for verify email</a>`,
  };

  // відправляю емейл на підтвердження
  await sendEmail(verifyEmail);

  // відправляю відповідь, що користувач створений
  res.status(200).body({ email: email }).json({
    message: "Verification email sent",
  });
};

module.exports = {
  verifyEmail: ctrlWrapper(verifyEmail),
  updateSubscription: ctrlWrapper(updateSubscription),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
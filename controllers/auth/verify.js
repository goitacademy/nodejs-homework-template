const { User } = require("../../models/userAuth");

const { RequestError } = require("../../helpers");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = User.findOne({ verificationToken }); //* Находим пользователя с таким токеном

  if (!user) {
    throw RequestError(404, "verify");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true, //* Обновляем verify на true для подтверждения
    verificationToken: "",
  });

  res.json({
    message: "Email verify succes",
  });
};

module.exports = verify;

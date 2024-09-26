const { User } = require("../../models/user");

//СТВОРЮЄМО КОНТРОЛЛЕР ДЛЯ ЗАВЕРШЕННЯ СЕСІЇ ЗАЛОГІНЕНОГО КОРИСТУВАЧА
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success. No Content",
  });
};

module.exports = logout;

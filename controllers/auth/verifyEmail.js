const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  // пошук користувача в моделі User
  const user = await User.findOne({ verificationToken });

  // якщо користувач з таким токеном не знайдений, поверне помилку
  if (!user) {
    throw HttpError(404, "User not found");
  }

  // якщо знайдено змінюємо verificationToken в null verify в true
  await User.findByIdAndUpdate(
    user._id,
    {
      verificationToken: null,
      verify: true,
    },
    { new: true }
  );

  res.json({ message: "verification succesful" });
};

module.exports = verifyEmail;

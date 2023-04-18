//СТВОРЮЄМО КОНТРОЛЛЕР ДЛЯ ВІДНОВЛЕННЯ СЕСІЇ ЗАЛОГІНЕНОГО КОРИСТУВАЧА ПРИ РЕФРЕШІ
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

module.exports = getCurrent;

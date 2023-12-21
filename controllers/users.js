const { ctrlWrapper } = require("../helpers"); // імпортуємо помилку для прокидування

const { contactServices } = require("../services");


// ************ ф-ція для регістрації користувача ************
const registerUser = async (req, res, next) => {
  const { email, name } = await contactServices.signup(req.body);

  res.status(201).json({
    email: email,
    name: name,
  });

};


module.exports = {
  registerUser: ctrlWrapper(registerUser),
};

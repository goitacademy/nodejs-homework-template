exports.signupServicesValidate = async (data) => {
  const newData = {
    ...data,
  };
  const newUser = await User.create(newData);
  newUser.password = undefined;

  // при регистрации мы сразу создаем токен и отправляем на главную
  const token = "";
  return { user: newUser, token };
};

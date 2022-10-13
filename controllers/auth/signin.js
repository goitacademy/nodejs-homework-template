const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // 1. данный вариант можно использовать если мы описали метод схемы в вайле user.js
  // if (!user || !user.comparePassword(password)) {
  //   throw RequestError(401, "wrong email or password");
  // }
  // 2. можно прямо сюда импортить bcrypt и здесь сравнивать пароли
  // использование синхронного кода с помощью Sync и асинхронного кода с помощью await одинаково работает -
  //   мы ждем выполнения этого кода и только после этого выподняем следующий код
  const passwordCompare = await bcrypt.compare(password, user.password);
  // const passwordCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passwordCompare) {
    throw RequestError(401, "wrong email or password");
  }
  // когда нужно вывести отдельно сообщение и на ошибочный email и на password
  // if (!user) {
  //   throw RequestError(401, "wrong email"); // throw RequestError(401, "wrong email or password")
  // }
  // const passwordCompare = await bcrypt.compare(password, user.password);
  // if (!passwordCompare) {
  //   throw RequestError(401, "wrong password"); // throw RequestError(401, "wrong email or password")
  // }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  // для того кто залогинился - user._id сперва записываем/обновляем поле токен в базе и потом его отправляем
  const result = await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "OK",
    code: 200,
    token: token,
    user: {
      email: result.email,
      name: result.name,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;

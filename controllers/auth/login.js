const jwt = require('jsonwebtoken');
require('dotenv').config();

const { user: service } = require('../../services');
console.log(service);

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.getOneUser({ email });

    if (!user || !user.compareUserPassword(password)) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Неверный email или пароль',
      });
      return;
    }
    const { SECRET_KEY } = process.env;
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await service.updateUserById(user._id, { token });
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: token,
      },
    });
    // if(!user) {
    //     res.status(400).json({
    //         status: "error",
    //         code: 400,
    //         message: "Пользователя с таким email не существует"
    //     });
    //     return;
    // }
    // if(!user.comparePassword(password)){
    //     res.status(400).json({
    //         status: "error",
    //         code: 400,
    //         message: "Неверный пароль"
    //     });
    //     return;
    // } ****/ этот вариант, если требуется пользователю указать, что именно неверно
  } catch (error) {
    next(error);
  }
};
module.exports = login;

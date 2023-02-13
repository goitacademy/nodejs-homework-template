const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { loginUser } = require('../../services/users');

const controllerLoginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email);
    const isPassword = await bcrypt.compare(password, user.password);

    if (!user || !isPassword) {
      return res.json({
        status: 'Unauthorized',
        code: 401,
        message: 'Email or password is wrong',
      });
    }

    const token = jwt.sign({ _id: user._id, email: user.email });

    res.json({
      status: 'success',
      code: 200,
      data: {},
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

module.exports = { controllerLoginUser };

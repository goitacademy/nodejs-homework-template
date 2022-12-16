const service = require('../../services');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await service.validateEmail(email);
    if (!user) {
      res
        .status(401)
        .json({ message: `User not found with this email ${email}` });
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(401).json({ message: 'The password is wrong' });
      return;
    }

    const payload = { id: user['_id'], subscription: user.subscription };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

    const result = await service.updateUserToken({ id: user['_id'], token });

    res.status(200).json({
      token: result.token,
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = login;

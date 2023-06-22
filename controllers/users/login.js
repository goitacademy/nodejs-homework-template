const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`401 error : !user `);
      throw res.status(401).json({ message: 'Email or pass invalid' });
    }
    const passwoedCompare = await bcrypt.compare(password, user.password);
    if (!passwoedCompare) {
      console.log(`401 error : !passwoedCompar`);
      throw res.status(401).json({ message: 'Email or pass invalid' });
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({ token, user: { user: user.email, subscription: user.subscription} });
  } catch (error) {
    next(error);
  }
};

module.exports = login;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../../models/user');

const { HttpError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong'); // throw HttpError(401, "Email invalid");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }
  
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong'); // throw HttpError(401, "Password invalid");
  }
  
  const payload = {
    id: user._id,
  }
  // console.log(payload);
  
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  // console.log(token);

  // const decodeToken = jwt.decode(token);
  // console.log(decodeToken);

  await User.findByIdAndUpdate(user._id, { token } );

  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    }
  });
}

module.exports = login;
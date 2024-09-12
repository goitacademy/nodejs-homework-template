const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const { SECRET_KEY } = process.env;

const {HttpError} = require("../../helpers");
const { User } = require("../../models/user/userModel");

const loginUser = async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, 'Email or password invalid');
  }
  
    if (!user.verify) {
       throw HttpError(401, 'Email not verified');
  }
  
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, 'Email or password invalid');
    }

    const payload = { id: user.id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, { token });

      res.status(200).json({
    token,
    user: {
     name: user.name,
     email,
     subscription: user.subscription,
    }
  });
};

module.exports = loginUser;
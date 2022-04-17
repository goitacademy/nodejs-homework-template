const { User } = require('../../models');
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
        res.status(401).json({ message: 'Email or password is wrong' });
    }

    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7h" });
    await User.findByIdAndUpdate(user._id, { token });
    const { subscription } = user;
    res.json({code: 200,
        status: "OK",
        data: {
            token: token,
            user: {
                email,
                subscription
  }
}})
}

module.exports = login;
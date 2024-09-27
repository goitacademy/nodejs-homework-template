const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const {User} = require("../../models/user");

const { httpError } = require("../../helpers/httpError");

const login = async (req, res) => {
  
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw httpError(401, "Email or password invalid");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw httpError(401, "Email or password invalid");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
    } });
  } 
;

module.exports = login;
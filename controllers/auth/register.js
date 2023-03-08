const bcrypt = require("bcrypt");

const User = require("../../models/user");
const { httpError } = require("../../helpers/HttpError");

const register = async (req, res) => {
 
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw httpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } 
;

module.exports = register;
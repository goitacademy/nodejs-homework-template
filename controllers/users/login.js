const { User, usersJoiSchemas } = require("../../models");
const { RequestError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = usersJoiSchemas.loginSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { email, password } = req.body;
    const userOnLogin = await User.findOne({ email });
    const passCompare = bcrypt.compareSync(password, userOnLogin.password);

    if (!userOnLogin || !passCompare) {
      throw RequestError(401, "Email or password is wrong");
    }
    if (!userOnLogin.verify) {
      throw RequestError(401, "Your email is not verified ");
    }
    const payload = {
      id: userOnLogin._id,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });
    await User.findByIdAndUpdate(userOnLogin._id, { token });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = login;

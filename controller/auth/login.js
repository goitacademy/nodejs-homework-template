// const { token } = require("morgan");
const { RequestError } = require("../../helpers");
const service = require("../../service/schemas/user");
const { authUserSchema } = require("../../validationSchemas/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET} = process.env;
const login = async (req, res, next) => {
  try {
    const { error } = authUserSchema.validate(req.body);
    if (error) {
      throw error;
    }
    const { email, password } = req.body;
    const user = await service.checkUser({ email });
    if (!user) {
      throw RequestError(401);
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw RequestError(401);
    }
    const { subscription, _id } = user;
    const token=jwt.sign({id: _id}, JWT_SECRET,{ expiresIn: '1d' });
    await user.updateOne({token});
    res.status(200).json({ token:token, user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};
module.exports = login;

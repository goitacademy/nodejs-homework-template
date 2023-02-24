const { User } = require("../../models/user");
const {  BadRequest, Unauthorized } = require("http-errors");
const { JoiSchemas } = require("../../models/user");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");




const userLogin = async (req, res, next) => {
    try {
      const { error } = JoiSchemas.userLoginJoiSchema.validate(req.body);
      if (error) {
        throw new BadRequest("Помилка від Joi або іншої бібліотеки валідації");
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Unauthorized("E-mail or password is wrong");
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        throw new Unauthorized("E-mail or password is wrong");
      }
  
      const payload = { id: user._id };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
  
      await User.findByIdAndUpdate(user._id, { token });
  
      res.status(201).json({
        token: token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } catch (error) {
      next(error);
    }
  }

module.exports = userLogin

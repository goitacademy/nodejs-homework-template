const { User } = require("../../models/user");
const { JoiSchemas } = require("../../models/user");
const bcrypt = require("bcrypt");


const { BadRequest, Conflict } = require("http-errors");

const userRegistration = async (req, res, next) => {
    try {
      const { error } = JoiSchemas.userRegistrationJoiSchema.validate(req.body);
      if (error) {
        throw new BadRequest("Помилка від Joi або іншої бібліотеки валідації");
      }
  
      const { email, password } = req.body;
      console.log(password);
      const user = await User.findOne({ email });
      if (user) {
        throw new Conflict("Email in use");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const result = await User.create({ ...req.body, password: hashedPassword });
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          email: result.email,
          sunscription: result.subscription,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  module.exports = userRegistration
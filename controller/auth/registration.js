const service = require("../../service/schemas/user");
const { authUserSchema } = require("../../validationSchemas/auth");
const bcrypt = require('bcrypt');

const registration = async (req, res, next) => {
  try {
    const { error } = authUserSchema.validate(req.body);
    if (error) {
      throw error;
    }
    const {email,password} =req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const { subscription } = await service.createUser({email,password:hashedPassword});
    res.status(201).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};
module.exports = registration;

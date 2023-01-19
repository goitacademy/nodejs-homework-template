const server = require("../../services/auth");
const schema = require("../../schemas/schemas");
const { User } = require("../../models/userModel");

const registrationController = async (req, res, next) => {
  try {
    console.log(req.body);
    const validationResult = schema.schemaLogin.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error });
    }
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }
    await server.registration(email, password);
    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registrationController,
};

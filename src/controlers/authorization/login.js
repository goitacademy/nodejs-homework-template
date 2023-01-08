const { login } = require("../../services/auth");
const schema = require("../../schemas/schemas");

const loginController = async (req, res) => {
  try {
    const validationResult = schema.schemaLogin.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error });
    }
    const { email, password } = req.body;

    const token = await login(email, password);
    console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "Email or password is wrong",
      });
    }
    res.status(200).json({
      token: token,
      user: {
        email: email,
        subscription: "starter",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  loginController,
};

const { users: service } = require("../../services");

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await service.getOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Already registered",
      });
    }
    const newUser = await service.add(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Successfully registered",
    });
  } catch (error) {}
};

module.exports = signup;

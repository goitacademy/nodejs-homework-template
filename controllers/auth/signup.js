const { users: service } = require("../../services");

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await service.getOne({ email });
    if (user) {
      return res.status(409).json({
        status: "conflict",
        code: 409,
        message: "Email in use",
      });
    }
    const newUser = await service.add(req.body);
    res.status(201).json({
      status: "created",
      code: 201,
      user: {
        email: "example@example.com",
        subscription: "starter",
      },
    });
  } catch (error) {}
};

module.exports = signup;

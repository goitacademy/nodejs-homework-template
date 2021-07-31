const { user: service } = require("../../services");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await service.getOne({ email });
    if (result) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: "Already registered",
      });
      return;
    }
    const newUser = await service.addUser({ email, password });
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;

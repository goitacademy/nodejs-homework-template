const User = require("../service/schemas/user");
const service = require("../service/user");
const bcrypt = require("bcryptjs");

const addUser = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      res.status(409).json({
        status: "conflict",
        code: 409,
        data: `email ${email} is alredy used`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await service.createUser({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};


module.exports = { addUser };

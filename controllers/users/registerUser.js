import { User, registerSchema } from "#schemas/users.js";

import bcrypt from "bcryptjs";

export async function registerUser(req, res, next) {
  const { email, password } = req.body;

  const validationResult = registerSchema.validate(req.body);

  if (validationResult.error) {
    res.status(400).json({
      message: `missing field`,
      error: validationResult.error,
    });
    return;
  }

  const user = await User.findOne({ email });

  // Registration conflict error
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }

  try {
    const hashPasswd = await bcrypt.hash(password, 10);
    const result = await User.create({ email, password: hashPasswd });

    res.status(201).json({
      status: "success",
      code: 201,
      ResponseBody: {
        user: {
          email: result.email,
          subscription: result.subscription,
        },
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

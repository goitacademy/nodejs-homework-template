require("dotenv").config();
const service = require("../services/user.service");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await service.getUserByEmail(email);
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    user = await service.createUser(email, password);

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Registration successful",
      user: { email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await service.getUserByEmail(email);

  if (!user || !user.validPassword(password)) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Email or password is wrong",
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  await service.saveToken(user.id, token);

  res.status(200).json({
    status: "success",
    code: 200,
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const logout = async (req, res, next) => {
  const user = await service.getUserById(req.user.id);

  if (!user) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Not autorized",
    });
  }

  await service.removeToken(req.user.id);

  res.status(204).json({
    status: "success",
    code: 204,
    message: "Successfuly logged out",
  });
};

const getCurrent = async (req, res, next) => {
  const user = await service.getUserById(req.user.id);

  if (!user) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Not autorized",
    });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    user: { email: req.user.email, subscription: req.user.subscription },
  });
};

module.exports = {
  createUser,
  login,
  logout,
  getCurrent,
};

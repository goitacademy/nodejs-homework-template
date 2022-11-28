const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getValidation = require("../middlewares/validationMiddlewares");
const service = require("../services/usersService");

const addUser = async (req, res) => {
  const bodyIsValid = await getValidation.userValid(req.body);

  if (bodyIsValid.error) {
    res.status(400).json({ message: bodyIsValid.error.message });
    return;
  }

  const uniqueEmailMiddleware = await service.getUserByEmail(req.body.email);

  if (uniqueEmailMiddleware) {
    res.status(409).json({
      message: "Email in use",
    });
    return;
  }

  try {
    const results = await service.createUser(req.body);
    res.status(201).json({
      user: {
        email: results.email,
        subscription: results.subscription,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  const bodyIsValid = await getValidation.userValid(req.body);

  if (bodyIsValid.error) {
    res.status(400).json({ message: bodyIsValid.error.message });
    return;
  }

  const user = await service.getUserByEmail(req.body.email);

  if (!user) {
    res
      .status(401)
      .json({ message: `No user with email: ${req.body.email} found` });
    return;
  }

  const { email, password, subscription, _id } = user;

  if (!(await bcrypt.compare(req.body.password, password))) {
    res.status(401).json({ message: "Wrong password" });
    return;
  }

  const token = jwt.sign({ _id }, process.env.JWT_SECRET);
  service.setToken(email, token);
  res.status(200).json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = { addUser, getUser };

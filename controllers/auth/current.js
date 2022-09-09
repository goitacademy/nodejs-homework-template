const { createError } = require("../../helpers");

const current = async (req, res, next) => {
  const { email } = req.body;
  const [, token] = req.headers.authorization.split(" ");

  if (!token) {
    throw createError(401, "Not authorized");
  }

  res.status(201).json({
    email,
  });
};

module.exports = current;

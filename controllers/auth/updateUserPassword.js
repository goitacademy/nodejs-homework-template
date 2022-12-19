const { createError, hashPassword } = require("../../helpers");

const { UPDATED_SUCCESSFULL, UPDATED_FAILED } = require("./authConstants");

const { updateUserById } = require("../../models/authModel/auth");

async function updateUserPassword(req, res, next) {
  const { userId } = req.params;

  const { password } = req.body;

  const passwordHash = await hashPassword(password);

  const updatedUser = await updateUserById({
    id: userId,
    body: { passwordHash },
  });
  // ! $2a$10$UFwnU4fEMA8W3ac.VCmDaeVegI0/WcIE6dcQI5MUEOrD6fJFwxvaS
  if (!updatedUser) {
    throw createError({ status: 409, message: UPDATED_FAILED });
  }

  res.status(201).json({
    status: 201,
    message: UPDATED_SUCCESSFULL,
  });
}

module.exports = updateUserPassword;

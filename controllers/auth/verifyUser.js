const { createError } = require("../../helpers");

const { USER_VERIFY_SUCCESS, USER_VERIFY_ERROR } = require("./authConstants");

const {
  updateUserById,
  getUserByVerifyToken,
} = require("../../models/authModel/auth");

async function verifyUserViaEmail(req, res, next) {
  const { verificationToken } = req.params;

  const user = await getUserByVerifyToken(verificationToken);

  if (!user) {
    throw createError({ status: 409, message: USER_VERIFY_ERROR });
  }

  console.log(user);

  const updatedUser = await updateUserById({
    id: user._id,
    body: { verificationToken: "", verify: true },
  });

  if (!updatedUser) {
    throw createError({ status: 409, message: USER_VERIFY_ERROR });
  }

  res.status(201).json({
    status: 201,
    message: USER_VERIFY_SUCCESS,
  });
}

module.exports = verifyUserViaEmail;

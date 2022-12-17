const { User } = require("../../models");
const createError = require("http-errors");
// const { sendEmail } = require("../../utils");

const reverifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    throw createError(404, "User not found");
  }

  const { verify, verifyToken } = user;

  if (verify) {
    throw createError(400, "Verification has already been passed");
  }

  // const mail = {
  //   to: email,
  //   subject: "Email verification",
  //   html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verifyToken}">Click here to verify your email</a>`,
  // };

  // await sendEmail(mail);

  res.status(200).json({
    status: "succes",
    code: 200,
    message: {
      verifyLink: `http://localhost:3000/api/users/verify/${verifyToken}`,
    },
  });
};

module.exports = reverifyEmail;

const { createError, sendEmail } = require("../../helpers");

const {
  USER_VERIFY_SUCCESS,
  USER_VERIFY_ERROR,
  USER_VERIFIED,
} = require("./authConstants");

const {
  getUserByEmail,
  updateUserById,
  getUserByVerifyToken,
} = require("../../models/authModel/auth");

async function verifyUserViaEmail(req, res, next) {
  const { params, body, method } = req;
  let user;
  console.log(req);
  if (method === "GET" && params.verificationToken) {
    user = await getUserByVerifyToken(params.verificationToken);
    if (!user) {
      throw createError({ status: 404 });
    }
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
  if (method === "POST" && body.email) {
    user = await getUserByEmail(body.email);

    if (!user) {
      throw createError({ status: 404 });
    }
    if (user.verify) {
      res.status(201).json({
        status: 201,
        message: USER_VERIFIED,
      });
      return;
    }
    if (user.verificationToken) {
      const emailOptions = {
        from: "testerovych@meta.ua",
        // to: `${user.email}`,
        to: "goodcat1994@gmail.com",
        subject: "Nodemailer test",
        text: ` "Привіт. Ми тестуємо надсилання листів!", Посилання для підтвердження реєстрації: http://localhost:3000/api/users/verify/${user.verificationToken}`,
        html: "<strong>Привіт. Ми тестуємо надсилання листів!</strong>",
      };

      const afterEmailSendRes = await sendEmail(emailOptions);

      console.log(afterEmailSendRes);

      res.status(201).json({
        status: 201,
        message: USER_VERIFIED,
      });
    }
  }
}

module.exports = verifyUserViaEmail;

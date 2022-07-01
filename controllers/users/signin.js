const services = require("../../services");
const { sendEmail } = require("../../helpers");
const signin = async (req, res, next) => {
  try {
    const user = await services.signinUser(req.body);
    console.log(user);
    const { email, avatarURL, verificationToken } = user;
    const mail = {
      to: email,
      subject: " Verify your email",
      html: `<a target="_blank" href="http://localhost:3000/api/v1/users/verify/${verificationToken}">href="http://localhost:3000/api/v1/users/verify/${verificationToken}"</a>`,
    };
    await sendEmail(mail);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        email,
        avatarURL,
        verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = signin;

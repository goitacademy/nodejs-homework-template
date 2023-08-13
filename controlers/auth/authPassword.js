const nodemailer = require('nodemailer');

const { catchAsync } = require("../../utils");
const userServices = require('../../services/user/userServices');
const Email = require('../../services/emailService');


const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await userServices.getUserByEmail(req.body.email);

  if (!user) {
    return res.status(200).json({
      message: 'Password reset instruction sent to email.'
    })
  }

  const otp = user.createPasswordResetToken();

  await user.save();

  //send opt by email

  try {
    const resetUrl = `${req.protocol}://${req.get('host')}/auth/reset-password/${otp}`; //when front and back are on the same server
    //const  resetUrl = `${req.urlServer}` // when front and back are on another server -> user click on site -> frontend -> req with token

    await new Email(user, resetUrl).sendRestorePassword();
  } catch (error) {
    console.log(error);

    user.PasswordResetToken = undefined;
    user.PasswordResetExpires = undefined;

    await user.save();
  };

  // const emailTransport = nodemailer.createTransport({
  //   service: 'sendgrid',
  //   auth: {
  //     user: 'user',
  //     pass: 'password',
  //   }
  // });  example how can use

  // const emailTransport = nodemailer.createTransport({
  //   host: 'sandbox.smtp.mailtrap.io',
  //   port: 2525,
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  // });

  // const emailConfig = {
  //   from: 'userandrii@meta.ua',
  //   to: 'user.email',
  //   subject: 'Password reset instruction',
  //   text: resetUrl,
  // };

  // await emailTransport.sendMail(emailConfig);

  res.status(200).json({
    message: 'Password reset instruction sent to email.'
  })
});

const resetPassword = catchAsync(async (req, res) => {
  const updatedUser = await userServices.resetPassword(req.params.otp, req.body.password)

  res.status(200).json({
    user: updatedUser,
  });
});

module.exports = {
  resetPassword,
  forgotPassword,
};
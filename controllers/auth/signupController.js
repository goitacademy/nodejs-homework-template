import { HttpCode } from "../../lib/constants";
import AuthService from "../../service/auth";
import { EmailService,  SenderSendgrid } from "../../service/email";
// const authService = new AuthService();


const signupController = async (req, res, next) => {
  const { email } = req.body
  const isUserExist = await AuthService.isUserExist(email)
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email is already exist',
    })
  }
  const userData = await AuthService.create(req.body)
  const emailService = new EmailService(
    process.env.NODE_ENV,
    new SenderSendgrid(),
  )
  const isSend  = await emailService.sendVerifyEmail(email, userData.name, userData.verifyTokenEmail)
  delete userData.verifyTokenEmail

  res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.CREATED, data: {...userData, isSendEmailVerify: isSend} })
}

export default signupController;
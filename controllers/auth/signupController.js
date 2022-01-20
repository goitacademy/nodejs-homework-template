import { HttpCode } from "../../lib/constants";
import AuthService from "../../service/auth";
import { EmailService,  SenderSendgrid } from "../../service/email";
import { CustomError } from '../../lib/custom-error';


const signupController = async (req, res, next) => {
  const { email } = req.body
  const isUserExist = await AuthService.isUserExist(email)
  if (isUserExist) {
    throw new CustomError(HttpCode.CONFLICT, 'Email is already exist')
   
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
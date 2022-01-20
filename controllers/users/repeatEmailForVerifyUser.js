// import repositoryContacts from '../../repository/contacts'
import repositoryUsers from '../../repository/users'
import { HttpCode } from '../../lib/constants'
// import {
//   UploadFileService,
//   LocalFileStorage,
//   CloudFileStorage,
// } from '../../service/file-storage'

import {
  EmailService,
  SenderNodemailer,
//   SenderSendgrid,
} from '../../service/email'

export const repeatEmailForVerifyUser = async (req, res, next) => {
    const { email } = req.body
    const user = await repositoryUsers.findByEmail(email)
    if (user) {
      const { email, name, verifyTokenEmail } = user
      const emailService = new EmailService(
        process.env.NODE_ENV,
        new SenderNodemailer(),
      )
  
      const isSend = await emailService.sendVerifyEmail(
        email,
        name,
        verifyTokenEmail,
      )
      if (isSend) {
        return res.status(HttpCode.OK).json({
          status: 'success',
          code: HttpCode.OK,
          data: { message: 'Success' },
        })
      }
      return res.status(HttpCode.UE).json({
        status: 'error',
        code: HttpCode.UE,
        data: { message: 'Unprocessable Entity' },
      })
    }
  
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      data: { message: 'User with email not found' },
    })
  }
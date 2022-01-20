// import repositoryContacts from '../../repository/contacts'
import repositoryUsers from '../../repository/users'
import { HttpCode } from '../../lib/constants'
import { CustomError } from '../../lib/custom-error';

export const verifyUser = async (req, res, next) => {
    const verifyToken = req.params.token
    const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken)
    console.log(
      '🚀 ~ file: index.js ~ line 47 ~ verifyUser ~ userFromToken',
      userFromToken,
    )
  
    if (userFromToken) {
      await repositoryUsers.updateVerify(userFromToken.id, true)
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { message: 'Success' },
      })
    }
    throw new CustomError(HttpCode.BAD_REQUEST, 'Invalid token')
  
  }
  
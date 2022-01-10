import { HttpCode } from '../../lib/constants'
import AuthService from '../../services/auth'

const authService = new AuthService()

export const registration = async (req, res, next) => {
    const {email} = req.body
    const isUserExist = await authService.isUserExist(email)
    if (isUserExist) {
        return res.status(HttpCode.CONFLICT).json({status: 'error', code: HttpCode.CONFLICT, message: 'Email in use' })
    }
    const data = await authService.create(req.body)
    res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK, data})
}

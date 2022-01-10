import { HttpCode } from '../../lib/constants'
import AuthService from '../../services/auth'

const authService = new AuthService()

export const current = async (req, res, next) => {
    const { email, subscription } = req.user;
    await authService.setToken(req.user.id, null)
    res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK, data: { email, subscription } })
}

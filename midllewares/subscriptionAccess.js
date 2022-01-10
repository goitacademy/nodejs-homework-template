import { HttpCode } from "../lib/constants"

const subscriptionAccess = (subscription) => async (req, res, next) => {
    const subscriptionCurrentUser = req.user.subscription
    if (subscriptionCurrentUser !== subscription) {
        return res.status(HttpCode.FORBIDDEN).json({
            status: 'error',
            code: HttpCode.FORBIDDEN,
            message: 'Access is denied',
            })
    }
    next ()
}

export default subscriptionAccess

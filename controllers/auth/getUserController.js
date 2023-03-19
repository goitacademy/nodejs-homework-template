const { NotAutorizedError } = require('../../helpers/errors')
const { getCurrentUser } = require('../../service/auth')


const getUserController = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        throw new NotAutorizedError('Not authorized')
    }

    const [tokenType, token] = req.headers.authorization.split(' ');
    // console.log(tokenType, token)

    const { email, subscription } = await (getCurrentUser(tokenType, token))

    res.status(200).json({
        "user": {
            email,
            subscription,
        }
    })
}

module.exports = getUserController
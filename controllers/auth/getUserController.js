const jwt = require('jsonwebtoken');
// const { login } = require('../../service/auth')
const { NotAutorizedError } = require('../../helpers/errors')

const User = require('../../models/auth')

const getUserController = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        next(new NotAutorizedError('Not authorized'))
        return;
    }

    const [tokenType, token] = req.headers.authorization.split(' ');
    // console.log(tokenType, token)
    if (!token) {
        next(new NotAutorizedError('Not authorized'))
        return;
    }

    try {
        const user = jwt.decode(token, process.env.JWT_SECRET)
        const { _id } = user;

        const { email, subscription } = await User.findOne({ _id });


        if (!user) {
            next(new NotAutorizedError('Not authorized'))
            return;
        }

        res.status(200).json({
            "user": {
                email,
                subscription,
            }
        })


    } catch (error) {
        next(new NotAutorizedError('Not authorized'))
    }



}

module.exports = getUserController
const jwt = require('jsonwebtoken')
const Users = require('../repository/users')
const { HTTP_STATUS_CODE } = require('../libs/constants')
const SECRET_KEY= process.env.JWT_SECRET_KEY

const guard = async (req, res, next) => { 
    const token = req.get('Authorization')?.split(' ')[1]

    if (!verifyToken(token)) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
            status: 'error',
            code: HTTP_STATUS_CODE.UNAUTHORIZED,
            message: 'Invalid token'
        })
    }
        const payload = jwt.decode(token)
    const user = await Users.findById({ _id: payload.id })

     if (!user || user.token !== token) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
            status: 'error',
            code: HTTP_STATUS_CODE.UNAUTHORIZED,
            message: 'Invalid token'
        })
    }
       
    req.user = user
    next()
}
const verifyToken = (token) => {
    try {
        const t = jwt.verify(token, SECRET_KEY)
        return !!t
    } catch (error) {
        return false
        
    }
}
module.exports = guard
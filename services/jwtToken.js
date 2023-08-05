var jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

exports.createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
} 

exports.verifyToken = (token) => {
    if(!token) throw new AppError(401, "Not logged in..")

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)

    
        return user.id

    } catch (error) {
        console.log('verifyToken gg')
        throw new AppError(401, "Not logged in..")
    }
}
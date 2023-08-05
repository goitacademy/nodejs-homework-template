const bcrypt = require('bcrypt')


exports.bcryptPassword = async(password ) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)
    return hashedPass
}

exports.checkBcryptPass = async(cantidate, passHash) => {
    const passIsTrue = await bcrypt.compare(cantidate, passHash)
    return passIsTrue
}
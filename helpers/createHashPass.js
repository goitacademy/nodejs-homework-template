const bcrypt = require('bcryptjs');

const createHashPass = async (password) => {
    const hashPassword = await bcrypt.hash(password, 10)
    return hashPassword
}

module.exports = createHashPass
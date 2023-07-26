const bcrypt = require('bcrypt');



const createHashPassword = async (password) => {
    const result = await bcrypt.hash(password, 10)
return result;
}

module.exports = createHashPassword;
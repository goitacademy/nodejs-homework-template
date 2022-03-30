const Users = require('../../repository/users');
const jwt = require('jsonwebtoken')

class UsersService {
    async isUserExist(email) {
        const user = await Users.findByEmail(email);
        return !!user
    }

    async create(body) {
        const {name,email,subscription,avatarURL,verifyTokenEmail} = await Users.create(body);
        return {name,email,subscription,avatarURL,verifyTokenEmail}
    }

    async getUser(email, password) {
        const user = await Users.findByEmail(email);
        const isValidPassword = await user?.isValidPassword(password);
        if(!isValidPassword || !user.isVerify) {
            return null;
        }
        return user;
    }

    getToken(user) {
        const {id} = user;
        const payload = {id};
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn:'1h'});
        return token;
    }

    async setToken(id,token) {
        return await Users.updateToken(id,token);
    }


}

module.exports = new UsersService;
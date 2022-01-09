import pkg from 'jsonwebtoken';
import Users from "../../repository/users"
const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
    async isUserExist(email) {
      const user = await Users.findByEmail(email)
      return !!user
    }

    async create(body) {
        const {id, name, email, role} = await Users.create(body)
        return {
            id, name, email, role
        }
    }

    async getUser(email, password) {
        const user = await Users.findByEmail(email)
        const isValidPassword = await user?.isValidPassword(password)
        if(!isValidPassword) {
            return null
        }
        return user
    }

    getToken(user) {
        const { id , email } = user
        const payload = { id , email}
        const token = pkg.sign(payload, SECRET_KEY, {expiresIn: '1d'})
        return token
    }

    async setToken(id, token) {
        await Users.updateToken(id, token)
    }
}

export default AuthService

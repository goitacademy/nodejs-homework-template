import jwt from "jsonwebtoken"
import repositoryUsers from "../../repository/users"

const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
    async isUserExist (email) {
        const user = await repositoryUsers.findByEmail(email)
        return !!user
    }

    async create (body) {
        const {id, name, email, subscription} = await repositoryUsers.create(body)
        return {
            id, name, email, subscription
        }
    }

    async getUser (email, password) {
        const user = await repositoryUsers.findByEmail(email)
        const isValidPassword = await user?.isValidPassword(password)
        if (!isValidPassword) {
            return null
        }
        return user
    }

    getToken (user) {
        const { id } = user
        const payload = { id }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '8h' })
        return token
    }

    async setToken (id, token) {
        await repositoryUsers.updateToken(id,token)
    }
}

export default AuthService

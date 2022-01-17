import jwt from "jsonwebtoken"
import UsersRepository from "../../repository/users"
const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
    async isUserExist(email){
     const user = await UsersRepository.findByEmail(email)
     return !!user
    }
    
    async create(body){
        const { id, email, subscription, avatar} = await UsersRepository.create(body)
        return { id, email, subscription, avatar}
    }

    async getUser(email, password) {
        const user = await UsersRepository.findByEmail(email)
        const isValidPassword = await user?.isValidPassword(password)
        if(!isValidPassword){
            return null
        }
        return user
    }

    getToken(user){
        const {id} = user
        const payload = {id}
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '2h'} )
        return token
    }
    
    async setToken(id,token) {
        await UsersRepository.updateToken(id, token)
    }

    async setSubscription(id, subscription){
        await UsersRepository.updateUser(id, subscription)

    }
}

export default new AuthService() 
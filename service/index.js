import Users from "../repository/users.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthServis {
   async isUserExist(email) {
      const user = await Users.findByEmail(email);
return !!user
   };

   async create(body) {
       const {id, name, email, role} = await Users.create(body);
       return {id, name, email, role}

   }
   async getUser(email, password){
       const user = await Users.findByEmail(email);
       const isValidPassword = await user.isValidPassword(password);
       console.log('getUser', isValidPassword);
       if (!isValidPassword) {
           return null
       }
       return user
   }

getToken(user){
    const id = user.id;
    const payload = {id}
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'})
    return token
}
async setToken(id, token){
    await Users.updateToken(id, token)
}
};

export default AuthServis

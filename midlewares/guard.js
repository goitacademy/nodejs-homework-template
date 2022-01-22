import Users from "../repository/users.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
import {httpCode} from '../lib/constants.js'

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const feryfyToken = (token) =>{
    try {
        const veryfy = jwt.verify(token, SECRET_KEY);
        return !!veryfy
    } catch (error) {
        return false
    }
};

const guard = async (req, res, next) =>{
    const token = req.get('Autorization')?.split(' ')[1];
    console.log('token',token);
    const isValidToken = feryfyToken(token);
    if (!isValidToken) {
        return    res.status(httpCode.UNAUTHORIZED).
        json({status: 'error', code: httpCode.UNAUTHORIZED,message: 'Not authorized1'});
    }
    const payload = jwt.decode(token);
    const user = await Users.findById(payload.id)
    if (!user || user.token !== token) {
        return    res.status(httpCode.UNAUTHORIZED).
        json({status: 'error', code: httpCode.UNAUTHORIZED,message: 'Not authorized'});
    }
    req.user = user
    next()
}

export default guard


import jwt from 'jsonwebtoken';
import {
    CustomError,
    ValidationError,
    WrongParametersError,
    NotAuthorizedError,
} from '../helpers/error.js';

const authMiddleware = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(
            new NotAuthorizedError('Unauthorized! Please provide a token'),
        );
    }
    const [tokenType, token] = req.headers['authorization'].split(' ');
    if (!token || !req.headers.authorization) {
        next(new NotAuthorizedError('Token is requiered'));
    }
    try {
        const user = await jwt.decode(token, process.env.SALT);
        if (!user) {
            return next(new NotAuthorizedError('Invalid token'));
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        next(new NotAuthorizedError('Invalid token'));
    }
};

export default authMiddleware;

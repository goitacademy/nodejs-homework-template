import jwt from 'jsonwebtoken';
import { httpError } from '../helpers/index.js';
import ModelUser from '../models/Model-user.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';

const { JWT_SECRET } = process.env;

const authorization = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    console.log(authorization);
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
        throw httpError(401)
    }


    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await ModelUser.findOne({ _id: id });
        if (!user || !user.token) {
            throw httpError(401);
        }
        req.user = user;
        next();
    } catch (error) {
        next(httpError(401));
    }

}
export default ctrlWrapper(authorization);

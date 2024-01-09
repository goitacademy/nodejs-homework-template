const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { serverConfig } = require('../configs');

const { SECRET_KEY, JWT_EXPIRES } = serverConfig;

exports.signToken = payload => jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_EXPIRES });

exports.checkToken = token => {
    if (!token) throw new HttpError(401, 'Not authorized');
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        return id;
    } catch (error) {
        throw new HttpError(401, 'Not authorized');
    }
};
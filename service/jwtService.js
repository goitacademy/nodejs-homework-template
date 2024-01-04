const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');

const { SECRET_KEY, JWT_EXPIRES } = process.env;

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
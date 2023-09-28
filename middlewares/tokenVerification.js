const jwt = require('jsonwebtoken');
const User = require('../service/schemes/models/schemaUsers');

const { SECRET_KEY } = process.env;

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne({ _id: decoded.userId, token });
        if (!user) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        return next(res.status(401).json({ message: 'Not authorized' }));
    }
};

module.exports = authenticateToken;

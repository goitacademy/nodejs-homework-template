import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const [tokenType, token] = req.headers['authorization'].split(' ');
    if (!token) {
        res.status(401).json({ message: 'unauthorized' });
    }
    try {
        const user = await jwt.decode(token, process.env.SALT);
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default authMiddleware;

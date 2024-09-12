import jwt from 'jsonwebtoken';
import secret from '../secret.js';

const authorizationMiddleware = (req, res, next) => {
	const token = req.header('Authorization');
	if (!token) {
		return res.status(401).json({ message: 'Not authorized' });
	}

	try {
		const decoded = jwt.verify(token, secret);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Invalid token.' });
	}
};

export default authorizationMiddleware;

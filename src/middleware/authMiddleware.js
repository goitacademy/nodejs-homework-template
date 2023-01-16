//TODO: JWT token decode

// import jwt from 'jsonwebtoken'; // JWT
// import { NotAuthorizedError } from '../helpers/errors.js';

// const authMiddleware = (req, res, next) => {
//   try {
//     const { authorization } = req.headers;
//     const [tokenType, token] = authorization.split(' ');

//     if (!authorization) {
//       next(new NotAuthorizedError('Please, provide a token'));
//     }

//     if (!token) {
//       next(new NotAuthorizedError('Please, provide a token'));
//     }
//     const user = jwt.decode(token, process.env.JWT_SECRET);
//     req.user = user;
//     req.token = token;

//     next();
//   } catch (error) {
//     next(new NotAuthorizedError('Invalid token'));
//   }
// };

// export default authMiddleware;

import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.SECRET;

export const createToken = (payload, expiresIn) => jwt.sign(payload, SECRET, { expiresIn });

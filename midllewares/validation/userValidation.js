import Joi from 'joi';
import { HttpCode } from '../../lib/constants';

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  
});

export const validateAuth = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: `Field ${err.message.replace(/"/g, '')}` });
  }
  next();
};


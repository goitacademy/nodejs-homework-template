import { userSchemaSignin } from '../models/User.js';
import { validateBody } from '../decorators/index.js';

const userValidateSignin = validateBody(userSchemaSignin)

export default userValidateSignin;
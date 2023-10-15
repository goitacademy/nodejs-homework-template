import { userSchemaSignup } from '../models/User.js';
import { validateBody } from '../decorators/index.js';

const userValidateSignup = validateBody(userSchemaSignup)

export default userValidateSignup;
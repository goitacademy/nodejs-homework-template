import { userSchemaSubscription } from '../models/User.js';
import { validateBody } from '../decorators/index.js';

const userValidateSubscription = validateBody(userSchemaSubscription)

export default userValidateSubscription;
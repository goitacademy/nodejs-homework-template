export { TUser } from './typesTS';
export { TUserSubscription } from './typesTS';

import model from './modelUser';
import outerSchema from './outerSchema';

const User = {
    model,
    outerSchema
}

export default User;
// export { default } from './Auth';

import getCurrent from "./getCurrent";
import login from "./login";
import signup from "./signup";
import logout from './logout';
import updateSubscription from './updateSubscription';
const ctrls = {
    signup,
    login,
    getCurrent,
    logout,
    updateSubscription,
}

export default ctrls;
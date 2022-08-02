// export { default } from './Auth';

import getCurrent from "./getCurrent";
import login from "./login";
import signup from "./signup";
import logout from './logout'
const ctrls = {
    signup,
    login,
    getCurrent,
    logout,
}

export default ctrls;
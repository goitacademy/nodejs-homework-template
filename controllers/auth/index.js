import { ctrlWrapper } from "../../decorators/index.js";
import getCurrent from "./getCurrentUser.js";
import login from "./login.js";
import logout from "./logout.js";
import register from "./register.js";
import updateAvatar from "./updateAvatar.js";
import updateSubscription from "./updateSubscription.js";

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
};
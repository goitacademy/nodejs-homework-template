import { ctrlWrapper } from "../../helpers/index.js";

import register from "./register.js";
import login from "./login.js";
import logout from "./logout.js";
import getCurrent from "./current.js";
import subscription from "./subscription.js";
import verifyEmail from "./verifyEmail.js";
import resendVerifyEmail from "./resendVerifyEmail.js";

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  subscription: ctrlWrapper(subscription),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};

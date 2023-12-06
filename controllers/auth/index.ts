import { ctrlWrapper } from "../../helpers";

import register from "./register";
import login from "./login";
import logout from "./logout";
import getCurrent from "./current";
import subscription from "./subscription";
import verifyEmail from "./verifyEmail";
import resendVerifyEmail from "./resendVerifyEmail";

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  subscription: ctrlWrapper(subscription),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};

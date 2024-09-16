import { ctrlWrapper } from "../../helpers/index.js";
import register from "./register.js";
import login from "./login.js";
import getCurrent from "./getCurrent.js";
import updateSubscription from "./updateSubscription.js";
import logout from "./logout.js";

const userController = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  logout: ctrlWrapper(logout),
};

export default userController;

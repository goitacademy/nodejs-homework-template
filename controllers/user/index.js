import { register } from "./register.js";
import { login } from "./login.js";
import { logout } from "./logout.js";
import { getCurrent } from "./getCurrent.js";
import { updateSubscription } from "./patch.js";

const user = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
};

export default user;

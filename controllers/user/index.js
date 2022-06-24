import { register } from "./register.js";
import { login } from "./login.js";
import { logout } from "./logout.js";
import { getCurrent } from "./getCurrent.js";
import { updateSubscription } from "./patch.js";
import { updateAvatar } from "./updateAvatar.js";
import { reVerification } from "./reVerification.js";
import { verifyEmail } from "./verifyEmail.js";

const user = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  reVerification,
  verifyEmail,
};

export default user;

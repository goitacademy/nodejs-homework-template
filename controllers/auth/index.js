import { ctrlWrapperAsync, ctrlWrapper } from "../../decorators/index.js";
import { signin } from "./signin.js";
import { signup } from "./signup.js";
import { signout } from "./signout.js";
import { getCurrent } from "./getCurrent.js";
import { updateSubscription } from "./updateSubscription.js";

export const ctrl = {
  signup: ctrlWrapperAsync(signup),
  signin: ctrlWrapperAsync(signin),
  signout: ctrlWrapperAsync(signout),
  updateSubscription: ctrlWrapperAsync(updateSubscription),
  getCurrent: ctrlWrapper(getCurrent),
};

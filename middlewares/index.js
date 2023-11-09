import { ctrlWrapperAsync } from "../decorators/ctrlWrapper.js";
import { validateId } from "./validateId.js";
import { authenticate } from "./authenticate.js";

export const mdw = {
  validateId: ctrlWrapperAsync(validateId),
  authenticate: ctrlWrapperAsync(authenticate),
};

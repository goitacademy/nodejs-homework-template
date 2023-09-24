import { userSchema } from "../../schemas/index.js";

import { validateBody } from "../../decorators/index.js";

const userSignUPtValidate = validateBody(userSchema.userSignupSchema);
const userSignINValidate = validateBody(userSchema.userSigninSchema);
const userRefreshValidate = validateBody(userSchema.userRefreshTokenSchema);
const userSubscriptionValidate = validateBody(
  userSchema.userUpdateSubscriptionSchema
);

export default {
  userSignUPtValidate,
  userSignINValidate,
  userRefreshValidate,
  userSubscriptionValidate,
};

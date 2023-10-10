import * as userSchemas from "../../models/User.js";

import { validateBody } from "../../decorators/index.js";

const userSignUpValidate = validateBody(userSchemas.userSignUpSchema);
const userSignInValidate = validateBody(userSchemas.userSignInSchema);
const userRefreschValidate = validateBody(userSchemas.userRefreschTokenSchema);

export default { userSignUpValidate, userSignInValidate, userRefreschValidate };

import { contactAddSchema } from "../../models/contact.js";
import { userSingSchema, userVerifySchema } from "../../models/user.js";
import { validateBody } from "../../decorators/index.js";

export const ausValidate = validateBody(userSingSchema);
export const ausVerify = validateBody(userVerifySchema);
export const contactValidate = validateBody(contactAddSchema);

import { contactAddSchema } from "../../models/contact.js";
import { userSingSchema } from "../../models/user.js";
import { validateBody } from "../../decorators/index.js";

export const ausValidate = validateBody(userSingSchema);
export const contactValidate = validateBody(contactAddSchema);

// export default contactValidate;

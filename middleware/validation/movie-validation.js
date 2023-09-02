import contactAddSchema from "../../schemas/contact-schemas.js";
import { validateBody } from "../../decorators/index.js";

const contactValidate = validateBody(contactAddSchema);

export default contactValidate;

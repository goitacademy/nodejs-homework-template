import contactSchema from "../../schemas/contact-schemas.js";
import { validateBody } from "../../decorators/index.js";

const contactValidate = validateBody(contactSchema);

export default contactValidate;

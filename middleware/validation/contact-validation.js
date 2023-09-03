import contactSchemas from "../../schemas/contact-schemas.js";
import { validateBody } from "../../decorators/index.js";

const addContactValidate = validateBody(contactSchemas.contactAddSchema);

export default { addContactValidate };

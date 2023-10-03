import { contactSchemeRequired } from "../schemas/contacts.schema.js";
import { validateBody } from "../decorators/index.js";

const contactValidateRequired = validateBody(contactSchemeRequired);

export default contactValidateRequired;

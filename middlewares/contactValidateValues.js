import { contactSchemeValues } from "../schemas/contacts.schema.js";
import { validateBody } from "../decorators/index.js";

const contactValidateValues = validateBody(contactSchemeValues);

export default contactValidateValues;

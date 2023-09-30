import { contactSchemeValues } from "../schemas/contackts-schemes.js";
import { validateBody } from "../decorators/index.js";

const contactValidateValues = validateBody(contactSchemeValues);

export default contactValidateValues;

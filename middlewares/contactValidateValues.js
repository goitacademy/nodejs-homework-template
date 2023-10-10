import { contactSchemeValues } from "../models/Contact.js";
import { validateBody } from "../decorators/index.js";

const contactValidateValues = validateBody(contactSchemeValues);

export default contactValidateValues;

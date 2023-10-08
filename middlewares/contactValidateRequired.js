import { contactSchemeRequired } from "../models/Contact.js";
import { validateBody } from "../decorators/index.js";

const contactValidateRequired = validateBody(contactSchemeRequired);

export default contactValidateRequired;

import { contactSchemeRequired } from "../schemas/contackts-schemes.js";
import { validateBody } from "../decorators/index.js";

const contactValidateRequired = validateBody(contactSchemeRequired);

export default contactValidateRequired;

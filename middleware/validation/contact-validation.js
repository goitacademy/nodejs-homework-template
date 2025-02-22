import contactsSchemes from "../../schemas/contact-scheme.js";
import { validateBody } from "../../decorators/index.js";

const addContactValidate = validateBody(contactsSchemes.addContactSchema);
const updateContactById = validateBody(contactsSchemes.updateContactSchema);

export default { addContactValidate };

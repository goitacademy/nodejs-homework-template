import contactSchemas from "../../schemas/contact-schemas.js";

import { validateContact } from "../../decorators/index.js";

const addContactValidate = validateContact(contactSchemas.contactAddSchema);

export default {
  addContactValidate,
};

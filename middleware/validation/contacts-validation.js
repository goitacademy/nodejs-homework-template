import contactsSchemas from "../../schemas/contacts-schemas.js";

import {validateBody} from "../../decorators/index.js";

const addContactsValidate = validateBody(contactsSchemas.contactAddSchema);
const updateContactsValidate = validateBody(contactsSchemas.contactUpdateSchema);


export default {
  addContactsValidate,
  updateContactsValidate,
};
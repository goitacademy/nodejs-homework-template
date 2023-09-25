import { contactSchema } from "../../schemas/index.js";

import { validateBody } from "../../decorators/index.js";

const addContactValidate = validateBody(contactSchema.contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(
  contactSchema.contactUpdateFavoriteSchema
);

export default {
  addContactValidate,
  contactUpdateFavoriteValidate,
};

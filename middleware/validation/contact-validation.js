import contactSchemas from "../../schemas/contact-schemas.js";
import { validateBody } from "../../decorators/index.js";

const contactAddValidate = validateBody(contactSchemas.contactAddSchema);
const contactUpdateValidate = validateBody(contactSchemas.contactUpdateSchema);
const favoriteUpdateValidate = validateBody(
  contactSchemas.favoriteUpdateSchema
);

export default {
  contactAddValidate,
  contactUpdateValidate,
  favoriteUpdateValidate,
};

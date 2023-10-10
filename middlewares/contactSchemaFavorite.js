import { contactSchemaFavorite } from "../models/Contact.js";
import { validateBody } from "../decorators/index.js";

const contactValidateRequired = validateBody(contactSchemaFavorite);

export default contactValidateRequired;

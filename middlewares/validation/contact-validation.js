import {
  addContactSchema,
  updateContactSchema,
  updateFavoriteFieldSchema,
} from "../../models/Contact.js";
import { validateBody } from "../../decorators/index.js";

const addContactValidate = validateBody(addContactSchema);
const updateContactById = validateBody(updateContactSchema);
const updateFavoriteFieldById = validateBody(updateFavoriteFieldSchema);

export default {
  addContactValidate,
  updateContactById,
  updateFavoriteFieldById,
};

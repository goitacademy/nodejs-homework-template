import { addSchema } from "./contactSchemas.js";
import { updateFavoriteSchema } from "./contactSchemas.js";
import { joiUserSchemas, joiUpdateSubscription } from "./userSchemas.js";

const schemas = {
  addSchema,
  updateFavoriteSchema,
  joiUserSchemas,
  joiUpdateSubscription,
};

export default schemas;

import contactSchema from "../../schemas/contact-scheme.js";
import { validateBody } from "../../decorators/index.js";

const addContactValidate = validateBody(contactSchema.movieAddSchema);

export default { addContactValidate };

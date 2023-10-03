import contactSchema from "../../schema/contact-schema.js";
import { validateBody } from "../../decorators/index.js";

const addContactValidate = validateBody(contactSchema.contactAddSchema);

export default {
    addContactValidate,
}
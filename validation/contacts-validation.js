import contactSchema from './schema-validation.js';

import { validateBody } from '../middleware/index.js';

const addContactValidate = validateBody(contactSchema.contactSchema);



export default {
  addContactValidate,
};
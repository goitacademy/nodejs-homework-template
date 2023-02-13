import joi from 'joi';

export const phonePattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

export const validationFields = {
  // Mongo Db validation
  // contactId: joi.alternatives(joi.number(), joi.string().guid({ version: 'uuidv4' })),
  contactId: joi.string().pattern(/^[0-9a-fA-F]{24}$/, 'Invalid id.'),
  name: joi.string().min(3).max(30),
  email: joi.string().email(),
  phone: joi.string().pattern(phonePattern),
  favorite: joi.boolean(),
};

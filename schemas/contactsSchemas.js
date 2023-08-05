import Joi from 'joi';

const message = {
  phone: 'Phone must be 10 digits long and may contain spaces and hyphens',

  name: [
    'First name and last name (optional)',
    'must contain only latin letters,',
    'start with a capital and',
    'be at least 2 characters long',
  ].join(' '),

  email: 'Invalid email',
};

const schemeObject = {
  name: Joi.string()
    .pattern(/^\s*[A-Z][a-z]+(\s+[A-Z][a-z]+)?\s*$/)
    .messages({ 'string.pattern.base': message.name }),

  phone: Joi.string()
    .pattern(/^([\s-]*\d[\s-]*){10}$/)
    .messages({ 'string.pattern.base': message.phone }),

  email: Joi.string().email({ minDomainSegments: 2 }),
};

// все поля обязательны
export const addedContactScheme = Joi.object(schemeObject).options({
  presence: 'required',
});

// минимум одно обязательное
export const updatedContactScheme = Joi.object(schemeObject)
  .or(...Object.keys(schemeObject))
  .messages({ 'object.missing': 'At least one field is required' });

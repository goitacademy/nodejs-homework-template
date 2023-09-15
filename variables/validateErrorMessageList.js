const validateErrorMessageList = {
  'any.required': `{#key} is a required field`,
  'string.email': 'email field must be a valid email',
  'string.base': `{#key} field must be a string`,
  'boolean.base': `{#key} field must be a boolean`,
  'object.unknown': `{#key} field is not allowed`,
  'object.min': 'missing fields',
  'string.min': '{#key} must be at least {#limit} characters long',
  'string.pattern.base': '{#key} field must be a valid {#key}',
};

module.exports = validateErrorMessageList;

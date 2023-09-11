const contactSchemas = require('../../schemas/contacts-schemas');

const { validateBody } = require('../../decorators/index');

const addContactValidation = validateBody(contactSchemas.contactAddSchema);

module.exports = {
    addContactValidation
}
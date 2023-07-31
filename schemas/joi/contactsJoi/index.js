const addContactSchema = require("./joiContactsSchema");
const updateFavoriteContactSchema = require("./joiContactsPatchSchema");

const contactSchemas = { addContactSchema, updateFavoriteContactSchema };

module.exports = contactSchemas;

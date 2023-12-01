router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

module.exports = addContact;

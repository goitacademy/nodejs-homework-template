router.delete("/:contactId", isValidId, ctrl.removeContact);

module.exports = removeContact;

router.get("/:contactId", isValidId, ctrl.getContactById);
module.exports = getContactById;

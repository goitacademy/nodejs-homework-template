const express = require("express");

const { contacts: contactsCtrl } = require("../../controlers");
const { contactsValidation } = require("../../midlewares");
const { contactsSchema } = require("../../schemas");

const router = express.Router();

router.get("/", contactsCtrl.getAll);
router.get("/:contactId", contactsCtrl.getById);
router.post("/", contactsValidation(contactsSchema), contactsCtrl.add);
router.delete("/:contactId", contactsCtrl.remove);
router.put(
    "/:contactId",
    contactsValidation(contactsSchema),
    contactsCtrl.update
);

module.exports = router;

const router = require("express").Router();

const ctrl = require("../../controllers/contacts");
const { contactJoiSchema } = require("../../models/contact");
const { validation } = require("../../middleware");

const validationContactMiddleware = validation(contactJoiSchema);

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validationContactMiddleware, ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validationContactMiddleware, ctrl.updateContact);

router.patch("/:contactId/favorite", ctrl.updateStatusContact);

module.exports = router;

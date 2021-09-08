const express = require("express"); // чтобы создать маршруты
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const { contacts: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/schemas/contact");
const { validation, authentificate } = require("../../middlewares");

router.get("/", authentificate, ctrl.listContacts); 
router.get("/:contactId", authentificate, ctrlWrapper(ctrl.getContactById));
router.post("/", authentificate, validation(joiSchema), ctrl.addContact); 
router.put("/:contactId", authentificate, ctrlWrapper(ctrl.updateContact));
router.patch("/:contactId/favorite", authentificate, ctrlWrapper(ctrl.updateField));
router.delete("/:contactId", authentificate, ctrlWrapper(ctrl.removeContact));

module.exports = router;

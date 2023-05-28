const { Router } = require("express");
const validateBody = require("../../decorators/validateBody.js");
const ctrl = require("../../controllers/contacts-controllers.js");
const isValidId = require("../../middleware/isValidId.js");
const { schemas } = require("../../models/contacts.js");

const router = Router();

router.get("/", ctrl.listContacts);
router.get("/:id", isValidId, ctrl.getContactById);
router.post("/", validateBody(schemas.contactAddSchema), ctrl.addContact);
router.delete("/:id", isValidId, ctrl.removeContact);
router.put(
  "/:id",
  isValidId,
  validateBody(schemas.contactAddSchema),
  ctrl.updateContact
);
router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;

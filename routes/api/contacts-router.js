const { Router } = require("express");
const validateBody = require("../../decorators/validateBody.js");
const validateStatusBody = require("../../decorators/validateStatusBody.js");
const ctrl = require("../../controllers/contacts-controllers.js");
const isValidId = require("../../middleware/isValidId.js");
const authenticate = require("../../middleware/authenticate.js");
const { schemas } = require("../../models/contact.js");

const router = Router();
router.use(authenticate);

router.get("/", ctrl.listContacts);
router.get("/:id", isValidId, ctrl.getContactById);
router.post("/", validateBody(schemas.contactAddSchema), ctrl.addContact);
router.put(
  "/:id",
  isValidId,
  validateBody(schemas.contactAddSchema),
  ctrl.updateContact
);
router.delete("/:id", isValidId, ctrl.removeContact);
router.patch(
  "/:id/favorite",
  isValidId,
  validateStatusBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);
router.get("/favorite=true", ctrl.listContacts);

module.exports = router;

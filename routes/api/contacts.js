const { Router } = require("express");

const ctrl = require("../../controllers/contacts");
const { isValidID, isValidBody, authenticate } = require("../../middlewares");
const { updateFavoriteSchema, addSchema } = require("../../validations/contactsSchemas");

const router = Router();

router.get("/", authenticate, ctrl.get);
router.get("/:contactId", authenticate, isValidID, ctrl.getByID);
router.post("/", authenticate, isValidBody(addSchema), ctrl.create);
router.put("/:contactId", authenticate, isValidID, isValidBody(addSchema), ctrl.update);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidID,
  isValidBody(updateFavoriteSchema),
  ctrl.updateFavorite
);
router.delete("/:contactId", authenticate, isValidID, ctrl.remove);

module.exports = router;

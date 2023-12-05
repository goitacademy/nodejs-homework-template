const { Router } = require("express");

const ctrl = require("../../controllers/contacts");
const { isValidID, isValidBody } = require("../../middlewares");
const { updateFavoriteSchema, addSchema } = require("../../validations/contactsSchemas");

const router = Router();

router.get("/", ctrl.get);
router.get("/:contactId", isValidID, ctrl.getByID);
router.post("/", isValidBody(addSchema), ctrl.create);
router.put("/:contactId", isValidID, isValidBody(addSchema), ctrl.update);
router.patch(
  "/:contactId/favorite",
  isValidID,
  isValidBody(updateFavoriteSchema),
  ctrl.updateFavorite
);
router.delete("/:contactId", isValidID, ctrl.remove);

module.exports = router;

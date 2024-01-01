const express = require("express");
const controllers = require("../../controllers/contacts");
const {
  validataBody,
  isValidId,
  isEmptyBody,
  authenticate,
} = require("../../middlewars");
const schemas = require("../../schemas/contacts");

const { isEmptyFavoriteUpdate } = require("../../middlewars/isEmptyBody");

const router = express.Router();
router.use(authenticate);

router.get("/", controllers.getAll);

router.get("/:contactId", isValidId, controllers.getById);

router.post(
  "/",
  isEmptyBody,
  validataBody(schemas.addSchema),
  controllers.addContact
);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validataBody(schemas.addSchema),
  controllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyFavoriteUpdate,
  validataBody(schemas.updateFavoriteSchema),
  controllers.updateContact
);

router.delete("/:contactId", isValidId, controllers.deleteContact);

module.exports = router;

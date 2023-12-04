const express = require("express");
const controllers = require("../../controllers/contacts");
const { validataBody } = require("../../middlewars");
const schemas = require("../../schemas/contacts");
const { isEmptyBody } = require("../../middlewars");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post(
  "/",
  isEmptyBody,
  validataBody(schemas.addSchema),
  controllers.addContact
);

router.put(
  "/:contactId",
  isEmptyBody,
  validataBody(schemas.addSchema),
  controllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validataBody(schemas.updateFavoriteSchema),
  controllers.updateStatusContact
);

router.delete("/:contactId", controllers.deleteContact);

module.exports = router;

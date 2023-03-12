const express = require("express");
const router = express.Router();
const validateBody = require("../../middlewares/validateBody");
const isValidId = require("../../middlewares/isValidId");
const { schema, updateFavoriteSchema } = require("../../schemas/schema");

const controller = require("../../controllers/contacts");

router.get("/", controller.getListContacts);

router.get("/:id", isValidId, controller.getContactById);

router.post("/", validateBody(schema), controller.addContact);

router.delete("/:id", isValidId, controller.removeContact);

router.put("/:id", isValidId, validateBody(schema), controller.updateContact);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  controller.updateStatusContact
);

module.exports = router;

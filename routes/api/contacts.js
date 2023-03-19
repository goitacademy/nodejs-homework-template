const express = require("express");
const router = express.Router();
const { validateBody, isValidId } = require("../../middlewares/index");
const { schema, updateFavoriteSchema } = require("../../schemas/schema");

const controller = require("../../controllers/index");

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

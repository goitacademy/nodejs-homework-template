const express = require("express");

const router = express.Router();

const contacts = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const { newContactSchema } = require("../../schemas");
const { updateContactSchema } = require("../../schemas");

const { controllerWrapper } = require("../../helpers");

router.get("/", controllerWrapper(contacts.getAll));

router.get("/:contactId", controllerWrapper(contacts.getById));

router.post(
  "/create",
  validateBody(newContactSchema),
  controllerWrapper(contacts.create)
);

router.delete("/:contactId", controllerWrapper(contacts.deleteById));

router.put(
  "/:contactId",
  validateBody(updateContactSchema),
  controllerWrapper(contacts.updateById)
);

router.patch(
  "/:contactId/favorite",
  validateBody(updateContactSchema),
  controllerWrapper(contacts.updateFavoriteById)
);

module.exports = router;

const express = require("express");

const router = express.Router();

const contacts = require("../../controllers/contacts");

const { validateBody, authenticate } = require("../../middlewares");

const { newContactSchema } = require("../../schemas");
const { updateContactSchema } = require("../../schemas");

const { controllerWrapper } = require("../../helpers");

router.get("/getAll", authenticate, controllerWrapper(contacts.getAll));

router.get("/:contactId", authenticate, controllerWrapper(contacts.getById));

router.post(
  "/create",
  authenticate,
  validateBody(newContactSchema),
  controllerWrapper(contacts.create)
);

router.delete(
  "/:contactId",
  authenticate,
  controllerWrapper(contacts.deleteById)
);

router.put(
  "/:contactId",
  authenticate,
  validateBody(updateContactSchema),
  controllerWrapper(contacts.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(updateContactSchema),
  controllerWrapper(contacts.updateFavoriteById)
);

module.exports = router;

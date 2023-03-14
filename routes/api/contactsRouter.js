const express = require("express");
const { controllerWrapper } = require("../../helpers");
const router = express.Router();
const { validateBody, userAuthMiddleware } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const {
  getContactsController,
  getOneContactController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contacts");

router.get("/", userAuthMiddleware, controllerWrapper(getContactsController));

router.get(
  "/:contactId",
  userAuthMiddleware,
  controllerWrapper(getOneContactController)
);

router.post(
  "/",
  userAuthMiddleware,
  validateBody(contactSchema.addContactSchema),
  controllerWrapper(addContactController)
);

router.delete(
  "/:contactId",
  userAuthMiddleware,
  controllerWrapper(removeContactController)
);

router.put(
  "/:contactId",
  userAuthMiddleware,
  validateBody(contactSchema.updateContactSchema),
  controllerWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  userAuthMiddleware,
  validateBody(contactSchema.updateStatusSchema),
  controllerWrapper(updateStatusContactController)
);

module.exports = router;

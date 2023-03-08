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

router.use(controllerWrapper(userAuthMiddleware));

router.get("/", controllerWrapper(getContactsController));

router.get("/:contactId", controllerWrapper(getOneContactController));

router.post(
  "/",
  validateBody(contactSchema.addContactSchema),
  controllerWrapper(addContactController)
);

router.delete("/:contactId", controllerWrapper(removeContactController));

router.put(
  "/:contactId",
  validateBody(contactSchema.updateContactSchema),
  controllerWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  validateBody(contactSchema.updateStatusSchema),
  controllerWrapper(updateStatusContactController)
);

module.exports = router;

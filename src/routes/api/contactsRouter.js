const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
} = require("../../controllers/contacts");
const { tryCatchWrapper } = require("../../helpers/index");
const {
  validateId,
  validateBody,
  validateFavorite,
  authMiddleware,
} = require("../../middlewares");
const {
  addContactSchema,
  putContactSchema,
  updateStatusSchema,
} = require("../../schemas");

const router = express.Router();

router.use(authMiddleware());

router.get("/", getContactsController);
router.get(
  "/:contactId",
  validateId(),
  tryCatchWrapper(getContactByIdController)
);
router.post(
  "/",
  validateBody(addContactSchema),
  tryCatchWrapper(addContactController)
);
router.delete(
  "/:contactId",
  validateId(),
  tryCatchWrapper(removeContactController)
);

router.put(
  "/:contactId",
  validateId(),
  validateBody(putContactSchema),
  tryCatchWrapper(updateContactController)
);
router.patch(
  "/:contactId/favorite",
  validateId(),
  validateFavorite(updateStatusSchema),
  tryCatchWrapper(updateContactController)
);

module.exports = { contactsRouter: router };

const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  // updateStatusContactController,
} = require("../../controllers/contacts.controller");
const { tryCatchWrapper } = require("../../helpers/index");
const {
  validateId,
  validateContactBody,
  validateFavorite,
} = require("../../middlewares/validationMiddleware");
const {
  addContactSchema,
  putContactSchema,
  updateStatusSchema,
} = require("../../schemas/validationSchemas");

const router = express.Router();

router.get("/", getContactsController);
router.get(
  "/:contactId",
  validateId(),
  tryCatchWrapper(getContactByIdController)
);
router.post(
  "/",
  validateContactBody(addContactSchema),
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
  validateContactBody(putContactSchema),
  tryCatchWrapper(updateContactController)
);
router.patch(
  "/:contactId/favorite",
  validateId(),
  validateFavorite(updateStatusSchema),
  tryCatchWrapper(updateContactController)
);

module.exports = router;

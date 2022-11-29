const express = require("express");
const {
  validateSchema,
  validateParams,
} = require("../../middlewares/SchemaValidator");
const contact = require("../../controller/contactsController");
const {
  schemaCreateContact,
  schemaUpdateContact,
  updateFavoriteSchema,
  schemaMongoId,
} = require("../../service/schema/validationSchemas");
const router = express.Router();
const { authMiddleware } = require("../../middlewares/authMiddlware");
const { asyncWrapper } = require("../../helpers/apiHelper.js");

router.use(authMiddleware);

router.get("/", asyncWrapper(contact.getContactsList));

router.get(
  "/:contactId",
  validateParams(schemaMongoId),
  asyncWrapper(contact.getById)
);

router.post(
  "/",
  validateSchema(schemaCreateContact),
  asyncWrapper(contact.create)
);

router.delete(
  "/:contactId",
  validateParams(schemaMongoId),
  asyncWrapper(contact.removeContact)
);

router.put(
  "/:contactId",
  validateSchema(schemaUpdateContact),
  validateParams(schemaMongoId),
  asyncWrapper(contact.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validateSchema(updateFavoriteSchema),
  validateParams(schemaMongoId),
  asyncWrapper(contact.updateStatus)
);

module.exports = router;

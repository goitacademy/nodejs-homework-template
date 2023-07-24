const express = require("express");
const contactsController = require("../../controllers/contacts-controller");
const isEmptyBody = require("../../middlewares/isEmptyBody");
const isValidId = require("../../middlewares/isValidId");

const router = express.Router();
const validateBody = require("../../decorators/validateBody");
const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("../../schemas/contact-schemas");

router.get("/", contactsController.getAll);

router.get("/:id", isValidId, contactsController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.add
);

router.delete("/:id", isValidId, contactsController.deleteById);

router.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.updateById
);

router.patch(
  "/:id/favorite",
  validateBody(contactUpdateFavoriteSchema),
  isValidId, 
  isEmptyBody,  
  contactsController.updateStatusContact
);

module.exports = router;

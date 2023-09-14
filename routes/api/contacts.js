import express from "express";
import contactsController from "../../controllers/contact-controller.js";
import validates from "../../middleware/validation/contact-validation.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", validates.contactAddValidate, contactsController.add);

router.delete("/:contactId", contactsController.removeById);

router.put(
  "/:contactId",
  validates.contactUpdateValidate,
  contactsController.updateById
);
router.put(
  "/:contactId/favorite",
  validates.favoriteUpdateValidate,
  contactsController.updateStatusContact
);

export default router;

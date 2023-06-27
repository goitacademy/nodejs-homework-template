const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contacts");
const { auth } = require("../middlewares/auth");
const { validateBody } = require("../middlewares/validateBody");
const { isValidId } = require("../middlewares/isValidId");
const { contactSchema } = require("../utils/validators/validator");

router.get("/", auth, contactController.getAll);
router.get("/:contactId", auth, isValidId, contactController.getById);
router.post(
  "/",
  auth,
  validateBody(contactSchema),
  contactController.addContact
);
router.put(
  "/:contactId",
  auth,
  isValidId,
  validateBody(contactSchema),
  contactController.updateContact
);
router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validateBody(contactSchema),
  contactController.setFavorite
);
router.delete("/:contactId", auth, isValidId, contactController.removeContact);

module.exports = router;

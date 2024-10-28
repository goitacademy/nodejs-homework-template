const express = require("express");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

const contactController = require("../../controllers/ContactsControllers");

router.get("/contacts", contactController.getContacts);

router.get("/contacts/:contactId", contactController.getContactsById);

router.post("/contacts", contactController.createContact);

router.delete("/contacts/:contactId", contactController.deleteContact);

router.put("/contacts/:contactId", contactController.updateContact);

router.patch(
  "/contacts/:contactId/favorite",
  contactController.updateFavoriteStatus
);

module.exports = router;

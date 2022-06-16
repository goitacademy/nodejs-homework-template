const express = require("express");

const router = express.Router();
const { joiSchema, joiFavoriteSchema } = require("../../models/contact");
const authMiddleware = require("../../middlewares/authMiddleware");
const validationMiddleware = require("../../middlewares/validationMiddleware");

const contacts = require("../../controllers/contacts");

router.get("/", authMiddleware, contacts.getContactsList);
router.get("/:contactId", contacts.getContactById);
router.post(
  "/",
  authMiddleware,
  validationMiddleware(joiSchema),
  contacts.addContact
);
router.put("/:contactId", validationMiddleware(joiSchema), contacts.updateById);
router.delete("/:contactId", contacts.removeById);

router.patch(
  "/:contactId/favorite",
  validationMiddleware(joiFavoriteSchema),
  contacts.updateStatus
);

module.exports = router;

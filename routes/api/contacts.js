const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contactsController");
const validation = require("../../middlewares/validation");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const auth = require("../../middlewares/auth");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

const validateMiddleware = validation(joiSchema);

router.get("/", auth, ctrlWrapper(ctrl.allContacts));

router.get("/:id", ctrlWrapper(ctrl.contactById));

router.post("/", auth, validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:id", ctrlWrapper(ctrl.deleteContact));

router.put("/:id", validateMiddleware, ctrlWrapper(ctrl.updateContact));

router.patch(
  "/:id/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;

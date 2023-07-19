const express = require("express");
const contactCtrl = require("../../controllers/contacts");
const { validateBody, isValid } = require("../../middlewares");
const {schemas} = require('../../models/contact')

const router = express.Router();

router.get("/", contactCtrl.getAll);

router.get("/:contactId", isValid, contactCtrl.getById);

router.post("/", validateBody(schemas.contactFull), contactCtrl.addOne);

router.delete("/:contactId", isValid, contactCtrl.deleteById);

router.put(
  "/:contactId",
  isValid,
  validateBody(schemas.contactFull),
  contactCtrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValid,
  validateBody(schemas.contactFavorite),
  contactCtrl.updateStatusContact
);

module.exports = router;

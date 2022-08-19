const express = require("express");
const { basedir } = global;
const {contacts: ctrl} = require(`${basedir}/controllers`)
const { auth, ctrlWrapper, validation } = require(`${basedir}/middlewares`);
const { joiSchema, favoriteJoiSchema } = require(`${basedir}/models/contact`);

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", auth, ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", auth, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  auth,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  auth,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusFavorite)
);

module.exports = router;

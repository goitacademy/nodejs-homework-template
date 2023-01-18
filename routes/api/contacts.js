const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, authUser } = require("../../middleware");
const { contactShema, updateFavoriteSchema } = require("../../models/contact");

router.get("/", authUser, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authUser, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authUser,
  validation(contactShema),
  ctrlWrapper(ctrl.createContact)
);
//dfgsdvdsfv

router.delete("/:contactId", authUser, ctrlWrapper(ctrl.remoteContact));

router.put(
  "/:contactId",
  authUser,
  validation(contactShema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authUser,
  validation(updateFavoriteSchema),
  ctrl.favorite
);

module.exports = router;

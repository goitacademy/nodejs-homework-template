const { Router } = require("express");
const contoller = require("./controller");

const {
  validateContact,
  validatePatchContact,
} = require("../helpers/validate");

const router = Router();

router.get("/", contoller.getContacts);

router.get("/:contactId", contoller.findContactById);

router.post("/", validateContact, contoller.postContact);
router.delete("/:contactId", contoller.deleteContact);

router.patch("/:contactId", validatePatchContact, contoller.patchContact);

router.patch(
  "/:contactId/favorite",
  validatePatchContact,
  contoller.patchFavorite
);

module.exports = router;

const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { tryCatch, validation, auth } = require("../../middlewares");
const {
  joiContacts: { contact, favorite },
} = require("../../schemas");

router.get("/", auth, tryCatch(ctrl.getAll));
router.get("/:id", auth, tryCatch(ctrl.getById));
router.post("/", auth, validation(contact), tryCatch(ctrl.add));
router.delete("/:id", auth, tryCatch(ctrl.dell));
router.put("/:id", auth, validation(contact), tryCatch(ctrl.updateById));
router.patch(
  "/:id/favorite",
  auth,
  validation(favorite),
  tryCatch(ctrl.updateFavorite)
);

module.exports = router;

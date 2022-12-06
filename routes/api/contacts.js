const express = require("express");

const router = express.Router();
const { tryCatch, validation } = require("../../middlewares");
// const { joiSchema, joiFavoriteSchema } = require("../../models/contact");
const { joiContacts } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

router.get("/", tryCatch(ctrl.getAll));

router.get("/:id", tryCatch(ctrl.getById));

router.post("/", validation(joiContacts.contactSchema), tryCatch(ctrl.add));

router.delete("/:id", tryCatch(ctrl.dell));

router.put(
  "/:id",
  validation(joiContacts.contactSchema),
  tryCatch(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  validation(joiContacts.favoriteSchema),
  tryCatch(ctrl.updateFavorite)
);

module.exports = router;

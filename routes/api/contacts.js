const express = require("express");

const { validation } = require("../../middlewares");
const { joiSchema, favoriteSchema } = require("../../Schema/joiContactSchema");
const { ErrorHttp, ctrlWrapper } = require("../../helpers/index.js");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:id", ctrlWrapper(ctrl.deleteById));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.patch(
  "/:id/favorite",
  validation(favoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;

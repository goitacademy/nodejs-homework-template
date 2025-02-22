const express = require('express');

const { contacts: ctrl } = require('../../controllers');

const { validation, ctrlWrapper } = require('../../middlewares');

const {contactSchemaJoi, favoriteSchemaJoi} = require('../../models');

const router = express.Router()

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactSchemaJoi), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

router.put(
  "/:contactId",
  validation(contactSchemaJoi),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteSchemaJoi),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;

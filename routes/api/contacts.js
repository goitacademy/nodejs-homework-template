const express = require("express");

const ctrl = require("../../controllers/contacts");

const { auth, ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", auth, ctrlWrapper(ctrl.add));

router.delete("/:contactId", auth, ctrlWrapper(ctrl.removeById));

router.put("/:contactId", auth, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  auth,
  ctrlWrapper(ctrl.updateFavoriteStatusById)
);

module.exports = router;

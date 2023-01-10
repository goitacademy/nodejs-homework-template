const express = require("express");
const { ctrlWrapper, validation } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
const {
  postContactSchema,
  putContactSchema,
  patchContactSchema,
} = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:id", ctrlWrapper(ctrl.getById));
router.post("/", validation(postContactSchema), ctrlWrapper(ctrl.add));
router.put("/:id", validation(putContactSchema), ctrlWrapper(ctrl.updateById));
router.patch(
  "/:id/favorite",
  validation(patchContactSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);
router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;

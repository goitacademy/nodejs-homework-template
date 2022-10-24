const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { validation, auth } = require("../../middlewares");
const { contactJoiSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");


const router = express.Router();

router.use(auth);

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactJoiSchema.contact), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(contactJoiSchema.contact),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validation(contactJoiSchema.status),
  ctrlWrapper(ctrl.updateStatusById)
);


module.exports = router;
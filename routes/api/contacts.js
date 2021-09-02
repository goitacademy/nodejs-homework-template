const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers");
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require("./validation");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validationCreateContact, ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", validationUpdateContact, ctrl.update);

router.patch(
  "/:contactId/favorite",
  validationUpdateStatusContact,
  ctrl.updateStatus
);
module.exports = router;

const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require("./validation");

router.get("/", guard, ctrl.getAll);

router.get("/:contactId", guard, ctrl.getById);

router.post("/", guard, validationCreateContact, ctrl.add);

router.delete("/:contactId", guard, ctrl.remove);

router.put("/:contactId", guard, validationUpdateContact, ctrl.update);

router.patch(
  "/:contactId/favorite",
  guard,
  validationUpdateStatusContact,
  ctrl.updateStatus
);
module.exports = router;

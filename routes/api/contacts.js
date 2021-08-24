const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers");
const {
  validationCreateContact,
  validationUpdateContact,
} = require("./validation");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validationCreateContact, ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", validationUpdateContact, ctrl.update);

module.exports = router;

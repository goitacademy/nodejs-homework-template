const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../utils");

router.get("/api/contacts", ctrlWrapper(ctrl.getAll));

router.get("/api/contacts/:id", ctrlWrapper(ctrl.getById));

router.post("/api/contacts", ctrlWrapper(ctrl.addContact));

router.put("/api/contacts/:id", ctrlWrapper(ctrl.updateById));

router.patch(
  "/api/contacts/:id/favorite",
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/api/contacts/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;

const express = require("express");
const { schemas } = require("../../models/contact");
const router = express.Router();
const validBody = require("../../middleware/validBody");
const ctrl = require("../../controllers/contacts");

// router.get("/", ctrl.getAll);

// router.get("/:id", ctrl.getById);

// router.post("/", ctrl.add);
router.post("/", validBody(schemas.contactsSchema), ctrl.add);
// router.delete("/:id", ctrl.deleteById);

// router.put("/:id", ctrl.updateById);

module.exports = router;

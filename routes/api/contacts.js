const express = require("express");

const router = express.Router();
const cntr = require("../../controler/contacts");
const { validate } = require("../../middelwars");
const schema = require("../../shemas/contacts");
router.get("/", cntr.getAll);

router.get("/:id", cntr.getById);

router.post("/", validate(schema.addSchema), cntr.add);

router.delete("/:id", cntr.deleteById);

router.put("/:id", validate(schema.addSchema), cntr.updateById);

module.exports = router;

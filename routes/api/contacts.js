const express = require("express");

const cntrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewars");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", cntrl.getAll);

router.get("/:contactId", cntrl.getById);

router.post("/", validateBody(schemas.addSchema), cntrl.add);

router.put("/:contactId", validateBody(schemas.addSchema), cntrl.updateById);

router.delete("/:contactId", cntrl.deleteById);

module.exports = router;

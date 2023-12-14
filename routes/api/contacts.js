const express = require("express");
const validateBody = require("../../middlewares");
const router = express.Router();
const schemas = require("../../schemas/contacts");

const cntrl = require("../../controllers/contacts");
router.get("/", cntrl.getAll);

router.get("/:id", cntrl.getById);

router.post("/", validateBody(schemas.addSchema), cntrl.add);

router.delete("/:id", cntrl.deleteById);

router.put("/:id", validateBody(schemas.addSchema), cntrl.update);

module.exports = router;

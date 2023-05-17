const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addCont);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateCont);

router.delete("/:id", ctrl.deleteCont);

module.exports = router;

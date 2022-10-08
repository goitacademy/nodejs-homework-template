const express = require("express");

const ctrl = require("../../controllers/contscts");
const { crtlWrapper } = require("../../utils");
const { validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", crtlWrapper(ctrl.getAll));
router.get("/:id", crtlWrapper(ctrl.getById));
router.post("/", validateBody(addSchema), crtlWrapper(ctrl.add));
router.delete("/:id", crtlWrapper(ctrl.deleteById));
router.put("/:id", validateBody(addSchema), crtlWrapper(ctrl.updateById));

module.exports = router;

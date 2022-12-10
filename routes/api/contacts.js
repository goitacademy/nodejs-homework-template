const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const ctrl = require("../../controllers/contacts");

const express = require("express");
const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/",validateBody(schemas.addShema) ,ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId",validateBody(schemas.addShema), ctrl.updateById);

router.patch("/:contactId",validateBody(schemas.patchShema), ctrl.patchById);

module.exports = router;

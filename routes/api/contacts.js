const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { updateSchema, contactsSchema } = require("../../shemas");
const { validateBody } = require("../../middlewares");


router.get("/",ctrl.getAll );

router.get("/:id",ctrl.getById);

router.post("/",validateBody(contactsSchema), ctrl.add);

router.delete("/:id",ctrl.deleteById);

router.put("/:id",validateBody(updateSchema),ctrl.updateById);

module.exports = router;

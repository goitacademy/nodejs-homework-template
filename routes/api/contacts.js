const express = require("express");



const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { volidateBody } = require("../../middlewares/index");
const { contactSchema } = require("../../schemas/index");


router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", volidateBody(contactSchema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", volidateBody(contactSchema), ctrl.updateById);

module.exports = router;

const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");


const router = express.Router();
router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validation(contactSchema), ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", validation(contactSchema), ctrl.update);

module.exports = router;

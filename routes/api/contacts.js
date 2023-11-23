const express = require("express");
const ctrl = require("../../controllers/contactsDecor");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contactsValid");

const router = express.Router();


router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.postCont);

router.delete("/:contactId", ctrl.deleteCont);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.putCont);

module.exports = router;

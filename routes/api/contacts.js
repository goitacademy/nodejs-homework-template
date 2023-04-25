const express = require("express");
const ctrl = require("../../controllers/contacts");
const validate = require("../../middlewares/validateBody");

const datavalidator = require("../../helpers/dataValidator");
const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validate.validateBodyPost(datavalidator), ctrl.post);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validate.validateBodyPut(datavalidator), ctrl.put);

module.exports = router;

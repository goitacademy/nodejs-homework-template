const express = require("express");
// const Joi = require("joi");
const router = express.Router();
const ctrl = require("../../controllers/contacts")

// const contacts = require("../../models/contacts");
// const { HttpError } = require("../../helpers");
// const { addContact } = require("../../models/contacts");


// const addShema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

router.get("/", ctrl.getAll );


router.get("/:contactId", ctrl.getById);


router.post("/", ctrl.add);


router.delete("/:contactId", ctrl.deleteById);


router.put("/:contactId", ctrl.updateById);

module.exports = router;

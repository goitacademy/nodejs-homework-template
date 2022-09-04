const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { ctrlWrapper } = require('../../helpers');

const { validateContactBody } = require('../../middlewares');

const { contactSchema } = require('../../schemas/contact');


router.get("/", ctrlWrapper(ctrl.getContactsList));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", validateContactBody(contactSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:id", ctrlWrapper(ctrl.removeById));


router.put("/:id", validateContactBody(contactSchema), ctrlWrapper(ctrl.updateById));


module.exports = router;

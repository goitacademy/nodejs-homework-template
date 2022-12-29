const express = require("express");

const contactsControls = require("../../controllers");
const router = express.Router();
// const Contacts = require('../../models/contactsOperations')

const {ctrlWrapper} = require("../../middlewares")

router.get("/", ctrlWrapper(contactsControls.getAll));

router.get("/:contactId", ctrlWrapper(contactsControls.getById));

router.post("/", ctrlWrapper(contactsControls.add));

router.delete("/:contactId", ctrlWrapper(contactsControls.removeById));

router.put("/:contactId", ctrlWrapper(contactsControls.updateById));

// router.get('/', async (req, res, next) => {
//     const contacts = await Contacts.find();
//     res.json(contacts)
// })

// router.get('/', async (req, res, next) => {
//     const contacts = await Contacts.create(req.body);
//     res.json(contacts)
// })

module.exports = router;

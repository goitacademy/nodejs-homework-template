const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");

const { addSchema } = require("../../schemas/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(addSchema), ctrlWrapper(ctrl.addContact));

router.put("/:id", validateBody(addSchema), ctrlWrapper(ctrl.updateContact));

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

module.exports = router;

// const express = require("express");
// const contacts = require("../../models/contacts.json");
// const router = express.Router();
// const contactsModel = require("../../models/contacts");

// router.get("/", contactsModel.getAllTea);

// router.get("/:id", (req, res) => {
//   res.json(contacts);
//   // res.send(contacts); // не виводить json
// });
// router.post("/", (req, res) => {
//   res.json(contacts);
//   // res.send(contacts); // не виводить json
// });
// router.put("/:id", (req, res) => {
//   res.json(contacts);
//   // res.send(contacts); // не виводить json
// });

// router.delete("/:id", (req, res) => {
//   res.json(contacts);
//   // res.send(contacts); // не виводить json
// });

// module.exports = router;

const express = require("express");

const router = express.Router();

// const {
//   getConts,
//   getContById,
//   createContact,
//   delContact,
//   updateCont,
// } = require("../../controllers/contactsControllers.js");
const getConts = require("../../controllers/getContsController");
const getContById = require("../../controllers/getContByIdController");
const createContact = require("../../controllers/createContactController");
const delContact = require("../../controllers/delContactController");
const updateCont = require("../../controllers/updateContController");

router.get("/contacts", getConts);

router.get("/contacts/:id", getContById);

router.post("/contacts", createContact);

router.delete("/contacts/:id", delContact);

router.put("/contacts/:id", updateCont);

module.exports = router;

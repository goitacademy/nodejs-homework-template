const express = require("express");

const router = express.Router();

const getConts = require("../../controllers/getContsController");
const getContById = require("../../controllers/getContByIdController");
const createContact = require("../../controllers/createContactController");
const delContact = require("../../controllers/delContactController");
const updateCont = require("../../controllers/updateContController");
const updateStatus = require("../../controllers/updateStatusController");

router.get("/contacts", getConts);

router.get("/contacts/:id", getContById);

router.post("/contacts", createContact);

router.delete("/contacts/:id", delContact);

router.put("/contacts/:id", updateCont);

router.patch("/contacts/:contactId/favorite", updateStatus);

module.exports = router;

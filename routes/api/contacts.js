const express = require("express");

const getContacts = require("../../controllers/getContacts");
const createContact = require("../../controllers/createContact");
const deleteContact = require("../../controllers/deleteContact");
const changeContact = require("../../controllers/changeContact");
const checkByID = require("../../controllers/checkByID");
const checkMid = require("../../middlewares/checkMid");

const router = express.Router();

router.get("/", getContacts);

router.get("/:id", checkMid, checkByID);

router.post("/", createContact);

router.delete("/:id", checkMid, deleteContact);

router.put("/:id", checkMid, changeContact);

module.exports = router;

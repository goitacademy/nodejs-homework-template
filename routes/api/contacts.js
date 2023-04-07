const router = require("express").Router();

const getAllContacts = require("../../controllers/getAllContacts");
const getById = require("../../controllers/getById");
const postContact = require("../../controllers/postContact");
const deleteContact = require("../../controllers/deleteContact.js");
const changeContact = require("../../controllers/changeContact.js");
router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", changeContact);

module.exports = router;

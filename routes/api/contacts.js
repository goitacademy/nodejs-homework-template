const express = require("express");

const contactsController = require("../../controllers/contacts-controller")

const router = express.Router();



router.get("/", contactsController.getAllReq);

router.get("/:contactId", contactsController.getByIdReq);

router.post("/", contactsController.postReq);

router.delete("/:contactId", contactsController.deleteReq);

router.put("/:contactId", contactsController.putReq);

module.exports = router;

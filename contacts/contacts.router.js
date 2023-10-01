const express = require("express");
const {
    getAllContactsHandler,
    getSingleContactHandler,
    addContactHandler,
    removeContactHandler,
    updateContactHandler,
    updateStatusContactHanlder
} = require("./contacts.controller");
const contactValidationMiddleware = require("./contacts.validators");

const router = express.Router();

router.get("/", getAllContactsHandler);
router.get("/:contactId", getSingleContactHandler);
router.post("/", addContactHandler);
router.delete("/:contactId", removeContactHandler);
router.put("/:contactId",contactValidationMiddleware, updateContactHandler);
router.patch("/:contactId/favorite", updateStatusContactHanlder);


module.exports = router;

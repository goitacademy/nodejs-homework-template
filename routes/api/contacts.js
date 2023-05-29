const express = require("express");

const contactCtrl = require("../../controllers/contactControllers");
const {
  postValidation,
  putValidation,
} = require("../../middlwares/bodyValidation");
const schema = require("../../schemas/addAndPut");

const router = express.Router();

router.get("/", contactCtrl.getAllContacts);

router.get("/:id", contactCtrl.getContact);

router.post("/", postValidation(schema), contactCtrl.postContact);

router.delete("/:id", contactCtrl.deleteContact);

router.put("/:id", putValidation(schema), contactCtrl.changeContactData);

module.exports = router;

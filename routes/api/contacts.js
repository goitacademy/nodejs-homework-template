const express = require("express");
const { Contacts } = require("../schema");
const router = express.Router();
const { validateJoi } = require("./validation");

router.get("/", async (__, res) => {
  const contacts = await Contacts.find();
  try {
    res.json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contacts.findById(contactId);
    res.json({
      status: "success",
      code: 200,
      data: contact,
      message: "Contact has been found",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  const contact = new Contacts(body);
  const validate = validateJoi(contact);
  try {
    await validate.value.save();
    res.json({
      status: "success",
      code: 201,
      data: contact,
      message: "Contact has been found created",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  try {
    const deleteContact = await Contacts.deleteOne({ _id: contactId });
    res.json({
      status: "success",
      code: 200,
      data: deleteContact,
      message: "Contact has been deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.put("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const contact = await Contacts.findOneAndUpdate({ _id: contactId }, body);
  const validate = validateJoi(contact);
  try {
    await validate.value.save();
    res.json({
      status: "success",
      code: 200,
      data: contact,
      message: "Contact has been created/updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

module.exports = router;

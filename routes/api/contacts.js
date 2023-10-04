const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const MODELS_PATH = path.join(__dirname, "../../models/contacts.js");
const {listContacts, getContactById, addContact, removeContact, updateContact} = require(MODELS_PATH);

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json({
      status: "ok",
      code: 200,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });
    }

    res.json({
      status: "ok",
      code: 200,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ "status": "Error", "message": error });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
   
    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing required field" });
      return 1;
    }
    const newContact = await addContact(req.body);
    res.json({
      status: "created",
      code: 201,
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ "status": "Error", "message": error });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });
    }

    const isRemoved = await removeContact(contactId);

    console.log(isRemoved === true);
    if(isRemoved) {
      res.json({
        "status":"success",
        "code": 200,
        ...isRemoved 
      });
    }
    
  } catch (error) {
    res.status(500).json({ "status": "Error", "message": error });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });
      return 1;
    }

    const {name, email, phone} = req.body;

    if (!name & !email & !phone) {
      res.status(400).json({ message: "missing field" });
      return 1;
    }
    
    const result = await updateContact(contactId, req.body);
      console.log(result);
    res.json({
      "status": "success",
      "code": 200, 
      "data": result
    });

  } catch (error) {
    res.status(500).json({ "status": "Error", "message": error });
  }
});

module.exports = router;

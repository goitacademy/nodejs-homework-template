const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const {joiValidation, joiValidationRequired} = require(path.join(__dirname, "../../utils/joiValidation"));

const requestError = require(path.join(__dirname, '../../utils/requestError.js'));

const MODELS_PATH = path.join(__dirname, "../../models/contacts.js");
const {listContacts, getContactById, addContact, removeContact, updateContact} = require(MODELS_PATH);

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    if (!data) {
      const error = requestError();
      throw error;
    }

    res.json({
      status: "ok",
      code: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      const error = requestError(404);
      throw error;
    }

    res.json({
      status: "ok",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const validationError  = joiValidationRequired({name, email, phone});
    
    if (validationError) {
      const err = requestError(400, validationError.message);
      throw err; 
    }

    const newContact = await addContact(req.body);
    res.json({
      status: "created",
      code: 201,
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      const error = requestError(404);
      throw error;
    }

    const isRemoved = await removeContact(contactId);

    if(isRemoved) {
      res.json({
        "status":"success",
        "code": 200,
        ...isRemoved 
      });
    }
    
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    
    if (!contact) {
      const error = requestError(404);
      throw error;
    }

    const {name, email, phone} = req.body;
      
    if (!name & !email & !phone) {
      const error = requestError(400, "missing field" )
      throw error;
    }

    const validationError = joiValidation({name, email, phone});

    if (validationError) {
      const error = requestError(400, validationError.message);
      throw error;
    }
    
    const result = await updateContact(contactId, req.body);
      
    res.json({
      "status": "success",
      "code": 200, 
      "data": result
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;

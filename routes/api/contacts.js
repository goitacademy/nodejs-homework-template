const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const { v4: uuidv4 } = require("uuid");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).email().required(),
  phone: Joi.string()
    .pattern(/^[+]?[0-9 ()-]*$/)
    .required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
  next();
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.json({
      status: "succes",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      error.message = '"missing required name - field';
      error.status = 400;
      throw error;
    }
    const newContacts = { id: uuidv4(), ...req.body };
    const result = await addContact(newContacts);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    if (!req.body) {
      const error = new Error("Missing fields");
      error.status = 400;
      throw error;
    }
    const { error } = schema.validate(req.body);
    if (error) {
      error.message = "missing required name field";
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const result = await updateContact(id, req.body);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require("express");
const { NotFound, BadRequest } = require("http-errors");

const {
  listContacts,
  addContact,
  removeContact,
  updateContactById,
  getContactById,
} = require("../../model/contacts");
const { updateSchema, contactSchema } = require("../../validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        data,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    if (!data) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        data,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const data = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        data,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await removeContact(contactId);
    if (!data) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = updateSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { contactId } = req.params;
    const data = await updateContactById(contactId, req.body);
    if (!data) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        data,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

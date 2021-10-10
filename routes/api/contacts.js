const express = require("express");
const createError = require("http-errors");
const { Contact } = require("../../models");
const { joiSchema } = require("../../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find({}, "id name email phone");
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    // const contact = await Contact.findOne({ _id: contactId });
    if (!contact) {
      // eslint-disable-next-line new-cap
      throw new createError(404, `Contact with id - ${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      // eslint-disable-next-line new-cap
      throw new createError(400, `bad request`);
    }
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: "success added",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      // eslint-disable-next-line new-cap
      throw new createError(404, `Contact with id - ${contactId} not found`);
    }
    res.json({
      status: "success delete",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    console.log(req.params);
    const { contactId } = req.params;
    const { error } = joiSchema.validate(req.body);
    if (error) {
      // eslint-disable-next-line new-cap
      throw new createError(400, `bad request`);
    }
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      // eslint-disable-next-line new-cap
      throw new createError(404, `Contact with id - ${contactId} not found`);
    }
    res.json({
      status: "success update",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

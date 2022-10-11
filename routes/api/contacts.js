const express = require("express");

const Contact = require("../../models/contact");
const router = express.Router();

const contactsSchema = require("../../models/contact");
router.get("/", async (req, res, next) => {
  const data = await Contact.find();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: data,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOne({ _id: contactId });
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id ${contactId} not found`,
      });
      return;
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
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json({
      status: "succes",
      code: 201,
      data: {
        result: newContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const removeContactyId = await Contact.findByIdAndRemove({ _id: contactId });
  if (!removeContactyId) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.status(200).json({
    status: "succes",
    code: 200,
    message: "contact deleted",
    data: {
      result: removeContactyId,
    },
  });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    if (!req.body) {
      res.status(400).json({
        status: "succes",
        code: 400,
        message: "missing fields",
      });
    }
    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(
      { _id: contactId },
      req.body,
      { new: true }
    );
    if (!result) {
      res.status(404).json({
        status: "success",
        code: 404,
        message: "Not found",
      });
    }
    res.status(201).json({
      status: "success",
      code: 200,
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    if (!req.body) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing field favorite",
      });
    }

    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(
      { _id: contactId },
      req.body,
      { new: true }
    );
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.status(201).json({
      status: "success",
      code: 200,
      result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

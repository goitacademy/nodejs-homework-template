const express = require("express");

const Contact = require("../../models/contact");
const router = express.Router();
const {auth} = require('../../middlewares')
const { contactsSchema } = require("../../models/contact");


router.get("/", auth, async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  
  const data = await Contact.Contact.find({ owner: _id }, "", { skip, limit: +limit }).populate("owner", "_id email subscription");
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
    const result = await Contact.Contact.findOne({ _id: contactId });
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

router.post("/", auth,  async (req, res, next) => {
  try {
    const { _id } = req.user;
 
    const { error } = contactsSchema.validate(req.body);
   
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message:"Joi validation"
      })
      error.status = 400;
      throw error();
    }
    const newContact = await Contact.Contact.create({ ...req.body, owner: _id });
  
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
  const removeContactyId = await Contact.Contact.findByIdAndRemove({ _id: contactId });
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

    const result = await Contact.Contact.findByIdAndUpdate(
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

    const result = await Contact.Contact.findByIdAndUpdate(
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

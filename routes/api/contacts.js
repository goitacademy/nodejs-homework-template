const express = require("express");
const Contact = require("../../models/contact");
const contactsSchema = require("../../models/contact");

const router = express.Router();

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
    res.status(200).json({
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

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Contacts was created",
      data: {
        result: newContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await Contact.findByIdAndRemove({ _id: contactId });
    if (!deleteContact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id ${contactId} not found`,
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact was deleted",
      data: {
        result: deleteContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status(400);
    }
    if (!req.body) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing fields",
      });
    }
    const { contactId } = req.params;
    const updateContactById = await Contact.findByIdAndUpdate(
      { _id: contactId },
      req.body,
      { new: true }
    );
    if (!updateContactById) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Contact was updated",
      data: {
        result: updateContactById,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status(400);
    }
    if (!req.body) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing field Favorite",
      });
    }
    const { contactId } = req.params;
    const updateFavoriteContactById = await Contact.findByIdAndUpdate(
      { _id: contactId },
      req.body,
      { new: true }
    );
    if (!updateFavoriteContactById) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Contact status was updated",
      data: {
        result: updateFavoriteContactById,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
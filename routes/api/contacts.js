const express = require("express");
const Contact = require("../../models/contact");
const { contactsSchema } = require("../../models/contact");
const {auth} = require("../../middlewares")

const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const data = await Contact.Contact.find({ owner: _id }, "", {skip, limit: +limit}).populate("owner", "_id email subscription");
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

router.post("/", auth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await Contact.Contact.create({ ...req.body, owner: _id });
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
    const deleteContact = await Contact.Contact.findByIdAndRemove({ _id: contactId });
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
    const updateContactById = await Contact.Contact.findByIdAndUpdate(
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
    const updateFavoriteContactById = await Contact.Contact.findByIdAndUpdate(
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

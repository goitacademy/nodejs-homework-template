const express = require("express");
const createError = require("http-errors");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { validateData } = require("../../middlewars/validation");

const { Contact } = require("../../models/contact");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw createError(404, "Not found");
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

router.post("/", validateData(joiSchema), async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
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

router.delete("/:contactId", async (req, res, next) => {
  try {
    const removedContact = await Contact.findByIdAndDelete(
      req.params.contactId
    );
    if (!removedContact) {
      throw createError(404, "Not found");
    }
    return res
      .status(200)
      .json({ status: "accepted", code: 200, message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validateData(joiSchema), async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      { name, email, phone, favorite },
      { new: true }
    );
    if (!updatedContact) {
      throw createError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId/favorite",
  validateData(favoriteJoiSchema),
  async (req, res, next) => {
    try {
      const { favorite } = req.body;
      const updateStatusContact = await Contact.findByIdAndUpdate(
        req.params.contactId,
        { favorite },
        { new: true }
      );
      if (!updateStatusContact) {
        throw createError(404, "Not found");
      }
      res.json({
        status: "success",
        code: 200,
        data: updateStatusContact,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { HttpError } = require("../../helpers/idex");

const { Contact } = require("../../db/mongoDB");

const validateContact = (data) => {
  const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().pattern(phonePattern),
  });
  return schema.validate(data);
};

// GET /api/contacts
router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/contacts/:contactId
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not Found!");
    }
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/contacts
router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      throw HttpError(400, "missing required name field");
    }

    const { error } = validateContact({ name, email, phone });

    if (error) {
      throw HttpError(400, error.details[0].message);
    }

    if (name && email && phone) {
      const result = await Contact.create({ name, email, phone });
      res.json({
        status: "success",
        code: 201,
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/contacts/:contactId
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not Found!");
    }
    res.json({
      status: "contact deleted",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/contacts/:contactId
router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const { name, email, phone } = body;
    const { error } = validateContact(body);

    if (error) {
      throw HttpError(400, error.details[0].message);
    }

    if (!body) {
      throw HttpError(400, "missing required name field");
    }
    const check = await Contact.findById(contactId);
    if (!check) {
      throw HttpError(404, "Not Found!");
    }
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { name, email, phone },
      { new: true }
    );
    res.json({
      status: "contact updated",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// маршрут PATCH /api/contacts/:contactId/favorite
router.patch("/:contactId/favorite", async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  try {
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!result) {
      throw HttpError(404, "Not Found!");
    }
    res.json({
      status: "contact updated",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

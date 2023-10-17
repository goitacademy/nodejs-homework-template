const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { HttpError } = require("../../helpers/index");

const { Contact } = require("../../db/contactsSchema");
const { passportAuthenticate } = require("./auth");

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
router.get("/", passportAuthenticate, async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw HttpError(401, "Unauthorized");
    }
    const userId = req.user._id;

    const { page = 1, limit = 10, favorite } = req.query;
    const filter = { owner: userId };
    if (favorite !== undefined) {
      filter.favorite = favorite === "true";
    }
    const skip = (page - 1) * limit;

    const result = await Contact.find(filter)
      .skip(skip)
      .limit(parseInt(limit, 10));
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
router.post("/", passportAuthenticate, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      throw HttpError(400, "missing required name field");
    }

    const { error } = validateContact({ name, email, phone });

    if (error) {
      throw HttpError(400, error.details[0].message);
    }

    const userId = req.user._id;

    if (name && email && phone) {
      const result = await Contact.create({
        name,
        email,
        phone,
        owner: userId,
      });
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

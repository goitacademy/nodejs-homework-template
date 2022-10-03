const express = require("express");
// const createError = require("http-errors");
const { NotFound } = require("http-errors");
const Joi = require("joi");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(10).required(),
});
// console.log("contactSchema", contactSchema.error);

const {
  listContacts,
  getContactById,
  addContact,
  // removeContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const products = await listContacts();

    res.json({
      status: "success",
      code: 200,
      data: {
        result: products,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      // throw createError(404, `Not found id=${contactId}`);
      throw new NotFound(`Not found id=${contactId}`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });
    if (error) {
      error.status = 400;
      for (const key in error._original) {
        if (!error._original[key]) {
          error.message = "missing required name field";
          // return;
        }
      }

      console.log("error.message:", error._original);
      throw error;
    }
    const result = await addContact(
      req.body.name,
      req.body.email,
      req.body.phone
    );
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

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router;

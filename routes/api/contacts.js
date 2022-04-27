const express = require("express");
const createError = require("http-errors");
const { Contact, joiSchema } = require("../../models/contact");
const add = require("../../controllers/add");
const { validation, ctrlWrapper } = require("../../middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find({});
    res.json({ status: "success", code: 200, result });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await await Contact.findById(id);
    if (!contact) {
      // eslint-disable-next-line new-cap
      throw new createError(404, `Contact with id = ${id} not found`);
    }
    res.json({ status: "success", code: 200, contact });
  } catch (error) {
    // //APP// app.use((err, req, res, next) => {
    //   res.status(500).json({ message: err.message });
    // });
    next(error);
  }
});
router.post("/", validation(joiSchema), ctrlWrapper(add));

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = joiSchema.validate(req.body);
//     if (error) {
//       // eslint-disable-next-line new-cap
//       throw new createError(400, error.message + "missing required name field");
//     }
//     const result = await Contact.create(req.body);
//     console.log(result);
//     res.status(201).json({ result });
//   } catch (error) {
//     next("err:", error);
//   }
// });

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await removeContact(id);
    if (!data) {
      // eslint-disable-next-line new-cap
      throw new createError(404, "Contact not found");
    }
    res.status(200).json({ message: "contact deleted", data });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      // eslint-disable-next-line new-cap
      throw new createError(400, error.message + "missing fields");
    }
    const id = req.params.contactId;
    if (!id) {
      // eslint-disable-next-line new-cap
      throw new createError(404, "Not found");
    }
    await Contact.findByIdAndUpdate(id, req.body);
    res.json({ status: "success", code: 200, data: req.body });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

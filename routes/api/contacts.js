const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const Contact = require("../../models/contact");

const {
  contactValidation,
  favoriteValidation,
} = require("../../middlewares/validation");
const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  }
  return res.json({
    status: "Not found",
    code: 404,
  });
});

router.post("/", contactValidation, async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contact = await Contact.create(req.body);
  if (!name || !email || !phone) {
    return res.json({
      status: `missing required field`,
      code: 400,
    });
  }
  if (!contact) {
    return res.json({
      status: `Contact ${name} is already in contact list`,
      code: 400,
    });
  }
  return res.json({
    status: "success",
    code: 201,
    data: { contact },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = await Contact.findByIdAndRemove(contactId);
  if (!contacts) {
    return res.json({
      message: "Not found",
      code: 404,
    });
  }
  return res.json({
    message: "Contact deleted",
    code: 200,
  });
});

router.put("/:contactId", contactValidation, async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.json({
      status: `missing field`,
      code: 400,
    });
  }
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) {
    return res.json({
      message: "Not found",
      code: 404,
    });
  }
  return res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
});
router.patch(
  "/:contactId/favorite",
  favoriteValidation,
  async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!req.body) {
      return res.json({
        message: "missing field favorite",
        code: 400,
      });
    }
    return res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const custom = Joi.defaults(() =>
  Joi.object({
    name: Joi.string().pattern(
      /^([A-Z]+'?[a-z]+|[A-Z][a-z]+'?[a-z]+) ([A-Z]+'?[a-z]+|[A-Z][a-z]+'?[a-z]+)$/
    ),
    email: Joi.string().email(),
    phone: Joi.string().pattern(
      /^([+][0-9]{0,4})?[\s]?([(][0-9]{1,3}[)])?[\s]?[0-9]{2,3}[-\s]?[0-9]{2,3}[-\s]?[0-9]{2,4}$/
    ),
  })
);

const schema = custom.object().or("name", "email", "phone");
const schemaRequired = custom
  .object()
  .options({ presence: "required" })
  .required();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { contacts },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
    return;
  }
  res.status(404).json({
    status: "Not found",
    code: 404,
  });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = await req.body;
  const check = schemaRequired.validate({ name, email, phone });
  if (check.error) {
    res.status(400).json({
      message: check.error.details[0].message,
      code: 400,
    });
    return;
  }
  const contact = await addContact({ name, email, phone });
  res.json({
    status: "success",
    code: 201,
    data: { contact },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const isDelete = await removeContact(contactId);
  if (isDelete) {
    res.json({
      status: "contact deleted",
      code: 200,
    });
  } else {
    res.status(404).json({
      message: "Not found",
      code: 404,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const check = schema.validate({ name, email, phone });
  if (check.error) {
    res.status(400).json({
      message: check.error.details[0].message,
      code: 400,
    });
    return;
  }
  const isExist = await updateContact(
    contactId,
    JSON.parse(JSON.stringify(check.value))
  );
  if (isExist) {
    res.json({
      status: "success",
      code: 200,
      data: { ...isExist },
    });
    return;
  }
  res.status(404).json({
    message: "Not found",
    code: 404,
  });
});

module.exports = router;

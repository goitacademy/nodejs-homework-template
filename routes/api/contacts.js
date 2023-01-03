const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const validation = require("../../models/validation");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await listContacts());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    }
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const validationResult = validation.validate(req.body);
    if (validationResult.error) {
      return res.json({
        status: validationResult.error.details[0].message,
        code: 400,
        message: "missing required name field",
      });
    }
    const contact = await addContact(req.body);

    res.json({
      status: "success",
      code: 201,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  if ((await getContactById(req.params.id)) === null) {
    res.status(404).json({ message: "Not Found" });
  }
  await removeContact(req.params.contactId);
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:id", async (req, res, next) => {
  try {
    const validationResult = validation.validate(req.body);
    if (validationResult.error) {
      return res.json({
        status: validationResult.error.details[0].message,
        code: 400,
        message: "missing fields",
      });
    }
    const contacts = await updateContact(req.params.id, req.body);
    if (!contacts) {
      res.json({
        status: "success",
        code: 404,
        message: "Not found",
      });
    } else {
      res.json({
        status: "success",
        code: 200,
        data: { contacts },
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

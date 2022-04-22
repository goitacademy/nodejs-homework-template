const express = require("express");
const router = express.Router();
const contactsFunctions = require("../../models/contacts");
router.get("/", async (req, res, next) => {
  console.log(await contactsFunctions.listContacts());
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contacts: await contactsFunctions.listContacts(),
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  if (contactsFunctions.getContactById()) {
    res.status(404).json({
      status: "error",
      code: 404,
      messege: `Contact with ${req.params.contactId} not found`,
    });
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contacts: await contactsFunctions.getContactById(req.params.contactId),
    },
  });
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contacts: await contactsFunctions.addContact(body),
    },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  res.status(204).json({
    status: "success",
    code: 204,
    data: {
      contacts: await contactsFunctions.removeContact(req.params.contactId),
    },
  });
});

router.put("/:contactId", async (req, res, next) => {
  const body = req.body;
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts: await contactsFunctions.updateContact(
        req.params.contactId,
        body
      ),
    },
  });
});

module.exports = router;

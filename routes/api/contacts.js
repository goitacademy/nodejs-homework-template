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
  if (!(await contactsFunctions.getContactById(req.params.contactId))) {
    return res.status(404).json({
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
  const addContact = await contactsFunctions.addContact(body);
  console.log(addContact);
  if (addContact.error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      messege: `${addContact.error.details[0].message}`,
    });
  }

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contacts: addContact,
    },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  if (!(await contactsFunctions.removeContact(req.params.contactId))) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: await contactsFunctions.removeContact(req.params.contactId),
  });
});

router.put("/:contactId", async (req, res, next) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    });
  }

  if (!(await contactsFunctions.updateContact(req.params.contactId, body))) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  const putContact = await contactsFunctions.updateContact(
    req.params.contactId,
    body
  );
  if (putContact.error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      messege: `${putContact.error.details[0].message}`,
    });
  }

  res.status(200).json({
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

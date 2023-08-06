const express = require("express");
const {schema} = require('../../utils/validation')
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: "200",
    data: {
      contacts,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact) {
    res.json({
      status: 200,
      data: {
        contact,
      },
    });
  } else {
    res.json({
      status: 404,
      message: "Not found",
    });
  }
});

router.post("/", async (req, res, next) => {

  const responseBody = schema.validate(req.body)
  if (responseBody.error) {
    res.json({
      message: responseBody.error.message
    })
  } else {
    const newContact = await addContact(req.body)
     res.json({
    status: "201",
    data: {
      newContact,
    },
  });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = await removeContact(contactId);

  if (contacts) {
    res.json({
      status: 200,
      message: "contact deleted",
    });
  } else {
    res.json({
      status: 404,
      message: "Not found",
    });
  }
});

router.put("/:contactId", async (req, res, next) => {

  const { contactId } = req.params;
  const responseBody = schema.validate(req.body)
  if (responseBody.error) {
    res.json({
      status: 400,
      message: responseBody.error.message
     
    })
  } else {
    const contact = await updateContact(contactId, req.body);
    if (contact) {
      res.json({
        status: 200,
        data: { contact },
      });
    } else {
      res.json({
        status: 404,
        message: "Not found",
      });
    }
    }
  });
  


module.exports = router;

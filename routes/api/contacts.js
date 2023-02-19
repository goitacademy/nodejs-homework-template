const func = require("../../models/contacts");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await func.listContacts();

  res.json({
    status: "success",
    code: 200,
    contacts: data,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const data = await func.getContactById(req.params.contactId);

  data !== "Not found"
    ? res.json({
        status: "success",
        code: 200,
        contact: data,
      })
    : res.status(404).json({
        status: "undefined",
        code: 404,
        message: "Not found",
      });
});

router.post("/", async (req, res, next) => {
  const data = await func.addContact(req.body);
  data !== "missing required name field"
    ? res.status(201).json({
        message: "contact added",
        status: 201,
        data: data,
      })
    : res.status(400).json({
        status: 400,
        message: data,
      });
});

router.delete("/:contactId", async (req, res, next) => {
  const data = await func.removeContact(req.params.contactId);

  if (data !== "Not found") {
    res.status(200).json({
      status: 200,
      message: `Contact was deleted`,
      contact: data,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Not found",
    });
  }
  res.end();
});

router.put("/:contactId", async (req, res, next) => {});

module.exports = router;

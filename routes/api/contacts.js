const express = require("express");
const { listContacts } = require("../../models/contacts");
// import listContacts from ("../../models/contacts");

// http://localhost:3000/api/contacts
//  npx nodemon server.js

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json({
      status: "succsses",
      code: 200,
      data: {
        result,
      },
      message: "200 succsses",
    });
  } catch (error) {
    console.error(next.error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;

const express = require("express");
const operations = require("../../models/contacts");
// import listContacts from ("../../models/contacts");

// http://localhost:3000/api/contacts

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await operations.listContacts();
    res.json({
      status: "succsses",
      code: 200,
      data: {
        result,
      },
      message: "200 succsses",
    });
    console.log(result);
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

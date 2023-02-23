const express = require("express");

const router = express.Router();

const listContacts = require("../controllers/listContacts");

router.get("/api/contacts", async (req, res, next) => {
  res.send("Это главный роутер");
  res.json({
    status: 200,
    data: {
      listContacts,
    },
  });
});

router.get("/api/contacts/:id", async (req, res, next) => {
  const contactId = req.params.id;
  if (!contactId) {
    return () => {
      res.json({
        message: "Not found",
        status: 404,
      });
      next();
    };
  } else {
    const contact = await listContacts.findById(contactId);
    res.json({
      status: 200,
      data: {
        contact,
      },
    });
  }
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

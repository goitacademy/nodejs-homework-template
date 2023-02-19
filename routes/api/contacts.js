const express = require("express");
const router = express.Router();
const schemas = require("../../middlewares/schemas/userContactSchemas");
const middleware = require("../../middlewares/validators/contactValidator");
const {
  getAllContacts,
  addContact,
  getContactById,
  updateContact,
  removeContact,
  updateStatusContact,
} = require("../../controllers/contactController");

router.get("/", async (req, res, next) => {
  try {
    const result = await getAllContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { params } = req;
  try {
    const result = await getContactById(params.contactId);
    if (!result) {
      res.status(404).send({ message: "Not Found" });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", middleware(schemas.addContact), async (req, res, next) => {
  console.log("req.body", req.body);
  const result = await addContact(req.body);
  res.status(201).json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const { params } = req;
  try {
    const result = await removeContact(params.contactId);
    if (!result) {
      res.status(404).json({
        message: "Not Found",
      });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.put("/:contactId", middleware(schemas.updateContact), async (req, res, next) => {
  const {
    body,
    params: { contactId },
  } = req;
  const result = await updateContact(contactId, body);
  if (!result) {
    return res.status(404).json({
      message: "Not Found",
    });
  } else {
    res.json(result);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const {
    body,
    params: { contactId },
  } = req;
  const result = await updateStatusContact(contactId, body);
  if (!result) {
    return res.status(404).json({
      message: "Not Found",
    });
  } else {
    res.json(result);
  }
});

module.exports = router;

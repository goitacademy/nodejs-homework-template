const express = require("express");
const contactControllers = require("../../controllers/contactControllers");
const authMiddleware = require("../../middleware/authMiddleware");
const path = require("path");

const router = express.Router();

router.use("/", express.static(path.join(__dirname, "../../public")));

router.use(
  "/avatars",
  express.static(path.join(__dirname, "../../public/avatars"))
);

router.get("/", authMiddleware, async (req, res) => {
  try {
    const contacts = await contactControllers.listContacts(req.user._id);
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:contactId", authMiddleware, async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await contactControllers.getContactById(
      contactId,
      req.user._id
    );

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newContact = await contactControllers.create(req.body, req.user._id);
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:contactId", authMiddleware, async (req, res) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await contactControllers.findByIdAndUpdate(
      contactId,
      req.body,
      req.user._id
    );

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:contactId", authMiddleware, async (req, res) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactControllers.findByIdAndDelete(
      contactId,
      req.user._id
    );

    if (deletedContact) {
      res.json(deletedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/:contactId/favorite", authMiddleware, async (req, res) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const updatedContact = await contactControllers.findByIdAndUpdate(
      contactId,
      { favorite },
      req.user._id
    );

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

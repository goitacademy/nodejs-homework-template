const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./models/db");
const {
  addContact,
  removeContact,
  updateContact,
  validateContact,
} = require("./routes/api/contacts");

const app = express();

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

app.post("/api/contacts", async (req, res) => {
  const { error } = validateContact(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeContact(id);
    if (!result) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = validateContact(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedContact = await updateContact(id, req.body);
    if (!updatedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { app };

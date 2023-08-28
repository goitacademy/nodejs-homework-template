const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// Lee el archivo JSON desde la carpeta models
const data = fs.readFileSync("./models/contacts.json", "utf-8");

router.get("/", async (req, res, next) => {
  try {
    const jsonData = JSON.parse(data); // Parsea el contenido JSON

    // Envía el contenido JSON como respuesta
    res.json({ status: "success", code: 200, contacts: jsonData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const jsonData = JSON.parse(data); // Parsea el contenido JSON

  // Envía el contenido JSON como respuesta

  const { contactId } = req.params;
  const findContactId = jsonData.find((contact) => contact.id === contactId);
  if (findContactId) {
    res.json({ status: "success", code: 200, contact: findContactId });
  }else{
    res.json({ status: "Error", code: 404,   message: "Contact not found",  });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const jsonData = JSON.parse(data);
  if (!name || !email || !phone) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing required parameters: id, name, email, phone",
    });
  } else {
    const id = uuidv4();
    jsonData.push({ id, name, email, phone });
    fs.writeFileSync(
      "./models/contacts.json",
      JSON.stringify(jsonData),
      "utf-8"
    );
    res.status(200).json({
      status: "success",
      code: 200,
      message: `Contact ${id} added successfully`,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const jsonData = JSON.parse(data); // Parsea el contenido JSON

  // Envía el contenido JSON como respuesta

  const { contactId } = req.params;
  const findContactId = jsonData.findIndex(
    (contact) => contact.id === contactId
  );

  if (findContactId === -1) {
    res.json({
      status: "error",
      code: 404,
      message: "Contact not found",
    });
  } else {
    res.json({ message: "The contact was remove succesfully" });
    jsonData.splice(findContactId, 1);
    fs.writeFileSync(
      "./models/contacts.json",
      JSON.stringify(jsonData),
      "utf-8"
    );
  }
});

router.put("/:contactId", async (req, res, next) => {
  const jsonData = JSON.parse(data); // Parsea el contenido JSON

  // Verificar si el cuerpo está vacío
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Request body is empty",
    });
  }

  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const findContactId = jsonData.find((contact) => contact.id === contactId);

  if (!findContactId) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }

  // Actualizar los campos si están presentes en el body
  if (name) {
    findContactId.name = name;
  }
  if (email) {
    findContactId.email = email;
  }
  if (phone) {
    findContactId.phone = phone;
  }
  fs.writeFileSync("./models/contacts.json", JSON.stringify(jsonData), "utf-8");
  res.json({ message: "Contact updated successfully" });
});

module.exports = router;

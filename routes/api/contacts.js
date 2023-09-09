const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/contacts");
// Lee el archivo JSON desde la carpeta models
/* const data = fs.readFileSync("./models/contacts.json", "utf-8"); */

router.get("/", listContacts);
router.get("/:contactId", getContactById);
router.delete("/:contactId", removeContact);
router.post("/", addContact);
router.put("/:contactId", updateContact);
module.exports = router;

/* 


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
 */

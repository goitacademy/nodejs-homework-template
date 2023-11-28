const HTTP_STATUS = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
};

// Importa el modelo de Contacto de Mongoose (ajusta según la base de datos que estés utilizando)
const Contact = require("../../models/contacts");  // Corregido: utiliza el modelo, no el controlador

const getContacts = async (req, res) => {
  try {
    // Carga los contactos desde la base de datos
    const contacts = await Contact.find();

    res.json(contacts);
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = getContacts;

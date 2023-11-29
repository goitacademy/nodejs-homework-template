const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Importa el modelo de Contacto de Mongoose (ajusta según la base de datos que estés utilizando)
const Contact = require("../../models/contacts");

const deleteContacts = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Busca el contacto en la base de datos por su ID
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Not found" });
    }

    // Elimina el contacto de la base de datos
    await Contact.findByIdAndDelete(contactId);

    res.json({ message: "Contact deleted successfully", deletedContact: contact });
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

module.exports = deleteContacts;

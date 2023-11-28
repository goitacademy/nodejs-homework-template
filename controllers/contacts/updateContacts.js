const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

const Joi = require("joi");

// Importa el modelo de Contacto de Mongoose (ajusta según la base de datos que estés utilizando)
const Contact = require("../../models/contacts");

// Función de validación con Joi
const validateContact = (contact) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  // La validación devuelve un objeto con la propiedad "error" si la validación falla
  return schema.validate(contact);
};

const updateContacts = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Busca el contacto en la base de datos por su ID
    const existingContact = await Contact.findById(contactId);

    if (!existingContact) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Not found" });
    }

    // Validación del objeto de contacto utilizando Joi
    const { error } = validateContact(req.body);

    if (error) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: error.details[0].message });
    }

    // Actualiza los campos del contacto existente
    existingContact.name = req.body.name;
    existingContact.email = req.body.email;
    existingContact.phone = req.body.phone;

    // Guarda los cambios en la base de datos
    await existingContact.save();

    res.json({ message: "Contact updated successfully", updatedContact: existingContact });
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = updateContacts;

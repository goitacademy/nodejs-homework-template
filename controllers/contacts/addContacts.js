const { v4: uuidv4 } = require("uuid");
const Joi = require('joi');
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

// Importa el modelo de Contacto de Mongoose (o ajusta según la base de datos que estés utilizando)
const Contact = require("../../models/contacts");

const validateContact = (contact) => {
  // Definir el esquema de validación con Joi
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });

  // Validar el contacto con el esquema
  const validation = schema.validate(contact);

  // Devolver el resultado de la validación
  return validation;
};

const loadContacts = async () => {
  try {
    // Utiliza el modelo de Mongoose para obtener todos los contactos desde la base de datos
    return await Contact.find();
  } catch (error) {
    console.error("Error in loadContacts:", error);
    throw error;
  }
};

const saveContact = async (contact) => {
  try {
    // Guarda un solo contacto en la base de datos utilizando el modelo de Mongoose
    await contact.save();
  } catch (error) {
    console.error("Error in saveContact:", error);
    throw error;
  }
};

const addContacts = async (req, res) => {
  try {
    // Crea un nuevo objeto de contacto utilizando los datos de la solicitud
    const newContact = new Contact({
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: false,
    });

    // Realiza la validación del nuevo contacto
    const { error } = validateContact(newContact);

    if (error) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: error.details[0].message });
    }

    // Guarda el nuevo contacto en la base de datos utilizando el modelo de Mongoose
    await saveContact(newContact);

    // Obtiene todos los contactos actualizados desde la base de datos
    const contacts = await loadContacts();

    // Responde con el nuevo contacto creado y la lista actualizada
    res.status(HTTP_STATUS.CREATED).json({ newContact, contacts });
  } catch (error) {
    console.error("Error in addContacts:", error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

module.exports = addContacts;

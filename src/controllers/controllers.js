import { contacts } from "../dataContacts/contacts.js";
import { response } from "../helpers/helpers.js";
import { v4 as uuidv4 } from "uuid";

const contactsCtrl = {};

contactsCtrl.listContacts = (req, res) => {
  try {
    response(res, 200, true, contacts, "lista de contactos");
  } catch (error) {
    response(res, 404, false, "", "Not found");
  }
};

contactsCtrl.getById = (req, res) => {
  try {
    const { id } = req.params;

    const user = contacts.find((item) => item.id === id);
    if (!user) {
      return response(res, 404, false, "", "Contacto no encontrado");
    }
    response(res, 200, true, user, "Contacto encontrado");
    res.json({
      ok: true,
      contact: id,
    });
  } catch (error) {
    response(res, 404, false, "", "Not found");
  }
};

contactsCtrl.addContact = (req, res) => {
  try {
    const { id, name, email, phone } = req.body;

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    response(res, 200, true, newContact, "Contacto guardado correctamente");
  } catch (error) {
    response(res, 400, false, "", "missing required name field");
  }
};

contactsCtrl.removeContact = (req, res) => {
  try {
    const { id } = req.params;
    const contactIndex = contacts.findIndex((item) => item.id === id);

    if (contactIndex === -1) {
      return response(res, 404, false, "", "Contacto no encontrado");
    }

    contacts.splice(contactIndex, 1);
    response(res, 200, true, "", "contacto eliminado");
  } catch (error) {
    response(res, 404, false, "", "Not found");
  }
};

contactsCtrl.updateContact = (req, res) => {
  try {
    const { id } = req.params;
    const contactIndex = contacts.findIndex((item) => item.id === id);

    if (contactIndex === -1) {
      return response(res, 400, false, "", "missing fields");
    }

    contacts[contactIndex] = {
      ...contacts[contactIndex],
      ...req.body,
    };

    response(res, 200, true, "", "Contacto actualizado correctamente");
  } catch (error) {
    response(res, 404, false, "", "Not found");
  }
};

export default contactsCtrl;

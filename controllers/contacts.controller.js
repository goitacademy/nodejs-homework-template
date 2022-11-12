const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(1).max(60).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string(),
});

const {
  getAllContacts,
  getContactById,
  createContact,
  removeContactById,
  updateContactById,
  updateStatusContactById,
} = require("../service/contactsService");

async function getAllController(req, res, next) {
  const contacts = await getAllContacts();
  return res.json(contacts);
}

async function getContactByIdController(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact) {
    return res.status(200).json(contact);
  } else {
    return res.status(404).json({ message: "Not found" });
  }
}

async function createContactController(req, res, next) {
  const { name, email, phone, favorite } = req.body;

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(400).json({
      message: validationResult.error.details,
    });
  }

  try {
    const result = await createContact({ name, email, phone, favorite });
    res.status(201).json({
      data: { contact: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function removeContactController(req, res, next) {
  const { contactId } = req.params;

  try {
    const result = await removeContactById(contactId);
    console.log(result);
    if (result) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function updateContactController(req, res, next) {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(400).json({
      message: validationResult.error.details,
    });
  }
  if (!req.body) {
    return res.status(400).json({ message: "missing fields" });
  }
  // const { name, email, phone, favorite } = req.body;
  const { contactId } = req.params;
  const resultUpdateContact = await updateContactById(contactId, req.body);
  if (!resultUpdateContact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(resultUpdateContact);
}

async function updateStatusContactController(req, res, next) {
  const { contactId } = req.params;
  console.log(contactId);
  if (!req.body) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const { favorite } = req.body;
  console.log(favorite);
  const resultUpdateStatusContact = await updateStatusContactById(
    contactId,
    favorite
  );
  if (!resultUpdateStatusContact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(resultUpdateStatusContact);
}

module.exports = {
  getAllController,
  getContactByIdController,
  createContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
};

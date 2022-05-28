const service = require("../service");
const { patternContact, patternFavorite } = require("../joi");

const get = async (req, res, next) => {
  try {
    const contacts = await service.getAllContacts();
    res.json({ data: contacts, status: "success", code: 200 });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await service.getContactById(contactId);
    res.json({ data: contact, status: "success", code: 200 });
  } catch (err) {
    next(res.json({ message: "Not found", status: "error", code: 404 }));
  }
};

const add = async (req, res, next) => {
  const validated = patternContact.validate(req.body);
  if (validated.error) {
    res.json({ message: validated.error.message, status: "error", code: 400 });
  }
  const { name, email, phone } = validated.value;

  if (name && email && phone) {
    try {
      const contact = await service.addContact({ name, email, phone });
      res.json({ data: contact, status: "success", code: 201 });
    } catch (err) {
      next(err);
    }
  } else {
    return res.json({
      message: "missing required name field",
      status: "error",
      code: 400,
    });
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await service.removeContact(contactId);
    if (contact) {
      res.json({
        data: contact,
        message: "contact deleted",
        status: "success",
        code: 200,
      });
    } else {
      res.json({ message: "Not found", status: "error", code: 404 });
    }
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const validated = patternContact.validate(req.body);
  if (validated.error) {
    res.json({ message: validated.error.message, status: "error", code: 400 });
  }
  const { name, email, phone } = validated.value;

  if (!name && !email && !phone) {
    res.json({ message: "missing fields", status: "error", code: 400 });
  } else {
    try {
      const contact = await service.updateContact(contactId, {
        name,
        email,
        phone,
      });
      res.json({ data: contact, status: "success", code: 200 });
    } catch (err) {
      next(res.json({ message: "Not found", status: "error", code: 404 }));
    }
  }
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  if (Object.keys(body).find(key => key === "favorite") !== "favorite") {
    return res.json({
      message: "missing field favorite",
      status: "error",
      code: 400,
    });
  } else {
    const validated = patternFavorite.validate(body);
    if (validated.error) {
      res.json({
        message: validated.error.message,
        status: "error",
        code: 400,
      });
    }
    const { favorite } = validated.value;

    try {
      const contact = await service.updateContact(contactId, {
        favorite,
      });
      res.json({ data: contact, status: "success", code: 200 });
    } catch (err) {
      next(res.json({ message: "Not found", status: "error", code: 404 }));
    }
  }
};

module.exports = {
  get,
  getById,
  add,
  remove,
  updateContact,
  updateFavorite,
};

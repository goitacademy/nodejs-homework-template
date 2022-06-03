const service = require("../service");
const {
  patternContactAdd,
  patternContactUpdate,
  patternFavorite,
} = require("../joi");

const get = async (req, res, next) => {
  const { page, limit, favorite } = req.query;
  let paginatedContacts = [];
  const { _id } = req.user;
  try {
    const contacts = await service.getAllContacts(_id);
    if (!page && !limit && favorite) {
      const filtered = contacts.filter(
        (contact) => String(contact.favorite) === favorite,
      );
      return res.json({ data: filtered, status: "success", code: 200 });
    }
    if (page && limit && !favorite) {
      const start = (Number(page) - 1) * Number(limit);
      const end = start + Number(limit);
      paginatedContacts = contacts.slice(start, end);
      return res.json({
        data: paginatedContacts,
        status: "success",
        code: 200,
      });
    }
    if (page && limit && favorite) {
      const filtered = contacts.filter(
        (contact) => String(contact.favorite) === favorite,
      );
      const start = (Number(page) - 1) * Number(limit);
      const end = start + Number(limit);
      paginatedContacts = filtered.slice(start, end);
      return res.json({
        data: paginatedContacts,
        status: "success",
        code: 200,
      });
    }
    res.json({ data: contacts, status: "success", code: 200 });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  try {
    const contact = await service.getContactById({ contactId, _id });
    res.json({ data: contact, status: "success", code: 200 });
  } catch (err) {
    next(res.json({ message: "Not found", status: "error", code: 404 }));
  }
};

const add = async (req, res, next) => {
  const { _id } = req.user;
  const validated = patternContactAdd.validate(req.body);
  if (validated.error) {
    return res.json({
      message: "missing required name field",
      status: "error",
      code: 400,
    });
  }
  const { name, email, phone } = validated.value;

  try {
    const contact = await service.addContact({
      name,
      email,
      phone,
      owner: _id,
    });
    res.json({ data: contact, status: "success", code: 201 });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  try {
    const contact = await service.removeContact({ contactId, _id });
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
  const { _id } = req.user;
  const { contactId } = req.params;
  const validated = patternContactUpdate.validate(req.body);
  if (validated.error) {
    res.json({ message: validated.error.message, status: "error", code: 400 });
  }
  const { name, email, phone } = validated.value;

  if (!name && !email && !phone) {
    res.json({ message: "missing fields", status: "error", code: 400 });
  } else {
    try {
      const contact = await service.updateContact(
        { contactId, _id },
        {
          name,
          email,
          phone,
        },
      );
      res.json({ data: contact, status: "success", code: 200 });
    } catch (err) {
      next(res.json({ message: "Not found", status: "error", code: 404 }));
    }
  }
};

const updateFavorite = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const body = req.body;
  if (Object.keys(body).find((key) => key === "favorite") !== "favorite") {
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
      const contact = await service.updateContact(
        { contactId, _id },
        {
          favorite,
        },
      );
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

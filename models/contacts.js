const service = require("../service");

const get = async (req, res, next) => {
  try {
    const results = await service.getAllContacts();
    res.json({
      status: "Database connection successful",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.getContactById(contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const add = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await service.addContact({ name, email, phone });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  try {
    const result = await service.updateContact(contactId, {
      name,
      email,
      phone,
    });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await service.removeContact(contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const favorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;

  try {
    const result = await service.updateStatusContact(contactId, { favorite });
    if (result) {
      res.json({
        status: "succcess",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing field favorite",
      });
    }
  } catch (e) {
    res.status(404).json({ message: "Not found" });
    next(e);
  }
};

module.exports = {
  get,
  getById,
  add,
  update,
  remove,
  favorite,
};

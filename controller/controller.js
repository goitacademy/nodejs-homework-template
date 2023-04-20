const service = require("../service/index");

const get = async (req, res, next) => {
  try {
    const results = await service.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contact id`,
      data: "Not Found",
    });
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
        data: "Not Found",
      });
    }
  } catch (e) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: "Not Found",
    });
    next(e);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await service.addContact({ name, email, phone });
    if (!result) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found data`,
        data: "Not Found",
      });
    }
    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact: result },
    });
  } catch (e) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found data`,
      data: "Not Found",
    });
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
    if (!result) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `missing field favorite`,
        data: "Not Found",
      });
    }
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
        data: "Not Found",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: `missing field favorite`,
      data: "Not Found",
    });
    next(e);
  }
};

const upStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  try {
    if (!contactId) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `missing field favorite`,
        data: "Not Found",
      });
    }
    const result = await service.updateStatus(contactId, { favorite });
    if (!result) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `missing field favorite`,
        data: "Not Found",
      });
    }
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
        data: "Not Found",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: `missing field favorite`,
      data: "Not Found",
    });
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    if (!contactId) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `missing field favorite`,
        data: "Not Found",
      });
    }
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
        data: "Not Found",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: `missing field favorite`,
      data: "Not Found",
    });
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
  upStatus,
};

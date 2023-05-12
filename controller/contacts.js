const service = require("../service");
const {
  contactAddSchema,
  contactUpdateSchema,
} = require("../service/schemas/contacts");

const get = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const result = await service.listContacts({ owner });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contacts`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  try {
    const result = await service.getContactById({ contactId, owner });
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
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { _id: owner } = req.user;

  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const result = await service.addContact({
      name,
      email,
      phone,
      owner,
    });
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
  const { _id: owner } = req.user;

  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await service.updateContact({ contactId, owner }, req.body);
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
    console.error(e);
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  try {
    const result = await service.updateContact({ contactId, owner }, req.body);
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
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  try {
    const result = await service.removeContact({ contactId, owner });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
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
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
};

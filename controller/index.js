import * as service from "../service/index.js";

export const get = async (req, res, next) => {
  try {
    const results = await service.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { contacts: results },
    });
  } catch (err) {
    res.json({
      status: "Internal Server Error",
      code: 500,
      message: err?.message,
    });
  }
};

export const getById = async (req, res, next) => {
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
      res.json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (err) {
    res.json({
      status: "Internal Server Error",
      code: 500,
      message: err?.message,
    });
  }
};

export const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await service.addContact({ name, email, phone });
    res.json({
      status: "success",
      code: 201,
      data: { contacts: result },
    });
  } catch (err) {
    res.json({
      status: "Internal Server Error",
      code: 500,
      message: err?.message,
    });
  }
};

export const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  try {
    const result = await service.updateContact(contactId, { name, email, phone, favorite });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (err) {
    res.json({
      status: "Internal Server Error",
      code: 500,
      message: err?.message,
    });
  }
};

export const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined || favorite === null) {
    res.json({ status: "error", code: 400, message: "missing field favorite" });
  }

  try {
    const result = await service.updateStatusContact(contactId, { favorite });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (err) {
    res.json({
      status: "Internal Server Error",
      code: 500,
      message: err?.message,
    });
  }
};

export const remove = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.removeContact(contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (err) {
    res.json({
      status: "Internal Server Error",
      code: 500,
      message: err?.message,
    });
  }
};

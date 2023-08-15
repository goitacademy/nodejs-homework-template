const service = require("../service");

const get = async (req, res, next) => {
  try {
    const result = await service.listContacts();
    res.json({
      status: "Success",
      code: 200,
      data: { contacts: result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.getContactById(id);
    if (!result) {
      res.json({
        status: "Error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not found",
      });
    } else {
      res.json({
        status: "Success",
        code: 200,
        data: { contact: result },
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await service.addContact({ name, email, phone });
    res.json({
      status: "Created",
      code: 201,
      data: { contact: result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.removeContact(id);
    if (result) {
      res.json({
        status: "Success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.json({
        status: "Error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const result = await service.updateContact(id, { name, email, phone });
    if (result) {
      res.json({
        status: "Success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.json({
        status: "Error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  if (favorite === "") {
    res.json({
      status: "Error",
      code: 400,
      message: "Missing field favorite",
    });
  } else {
    try {
      const result = await service.updateStatusContact(id, { favorite });
      if (result) {
        res.json({
          status: "Success",
          code: 200,
          data: { contact: result },
        });
      } else {
        res.json({
          status: "Error",
          code: 404,
          message: `Not found contact id: ${id}`,
          data: "Not found",
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
  updateStatus,
};

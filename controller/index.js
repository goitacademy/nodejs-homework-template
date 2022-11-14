const service = require("../service");

const get = async (req, res, next) => {
  try {
    const result = await service.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { contacts: result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await service.getContactById(id);
    if (results) {
      res.json({
        status: "success",
        code: 200,
        data: { contacts: results },
      });
    } else {
      res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
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

    res.status(201).json({
      status: "success",
      code: 201,
      data: { contacts: result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await service.removeContact(id);
    if (results) {
      res.json({
        status: "success",
        code: 200,
        message: "Contact deleted",
        data: { contacts: results },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
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

  try {
    const result = await service.updateContact(id, req.body);

    if (result) {
      res.json({ status: "success", code: 200, data: { contacts: result } });
    } else {
      res.status(404).json({
        status: "error",
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

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing field favorite",
    });
  }

  try {
    const result = await service.updateContact(id, { favorite });

    if (result) {
      res.json({ status: "success", code: 200, data: { contacts: result } });
    } else {
      res.status(404).json({
        status: "error",
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

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  updateStatusContact,
};

const service = require("../service/contactModel");

const get = async (req, res, next) => {
  try {
    const results = await service.getAllContacts();
    res.json({
      status: "success",
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
  const { id } = req.params;
  try {
    const result = await service.getContactById(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: result,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact not found by id ${id}`,
        data: "Not found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  try {
    const result = await service.createContact({
      name,
      email,
      phone,
      favorite,
    });
    res.json({
      status: "success",
      code: 201,
      data: {
        contact: result,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;
  try {
    const result = await service.updateContact(id, {
      name,
      email,
      phone,
      favorite,
    });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: result,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact not found by id ${id}`,
        data: "Not found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  try {
    if (favorite === undefined) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `missing field favorite`,
        data: "Not found",
      });
      return;
    }
    const result = await service.updateContact(id, {
      favorite,
    });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: result,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact not found by id ${id}`,
        data: "Not found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.removeContact(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: result,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact not found by id ${id}`,
        data: "Not found",
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
  updateFavorite,
  remove,
};
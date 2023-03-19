const service = require("../service");

// GET all contacts

const get = async (req, res, next) => {
  try {
    const contacts = await service.getAll();
    res.status(200).json(contacts);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// GET one contact by id

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await service.getById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// POST - add new contact (name, email, phone)

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const newContact = await service.createNew({ name, email, phone });

    res.status(201).json(newContact);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// PUT - update information about contact

const update = async (req, res, next) => {
  const { id } = req.params;
  const contact = req.body;
  try {
    const result = await service.update(id, contact);
    if (result) {
      res.status(200).json({
        data: result,
      });
    } else {
      res.status(404).json({
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// PATCH - add contact to favorites

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { favorite = false } = req.body;

  try {
    if (req.body) {
      const result = await service.update(id, { favorite });
      if (result) {
        res.status(200).json({
          data: result,
        });
      } else {
        res.status(404).json({
          message: `Not found contact id: ${id}`,
          data: "Not Found",
        });
      }
    } else {
      res.status(400).json({
        message: "missing field favorite",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// DELETE contact

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await service.remove(id);
    if (result) {
      res.status(200).json({
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        message: `Not found contact id: ${id}`,
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
  updateFavorite,
  remove,
};
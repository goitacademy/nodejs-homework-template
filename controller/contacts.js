const service = require("../service/contacts");

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
  } catch (error) {
    console.error(error);
    next(error);
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
        message: `Task with ID: ${id} not found`,
        data: "Not found",
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
    const createdContact = await service.createContact(name, email, phone);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { task: createdContact },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const updatedContact = await service.updateContact(id, {
      name,
      email,
      phone,
    });
    if (updatedContact) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: updatedContact,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Task with ID ${id} could not be found.`,
        data: "Not found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const updatedContact = await service.updateContact(id, { favorite });
    if (updatedContact) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: updatedContact },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with ID: ${id} could not be found`,
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
  update,
  updateFavorite,
};

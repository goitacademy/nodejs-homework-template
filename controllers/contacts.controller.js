const contactsService = require("../services/contacts.service");

const get = async (req, res, next) => {
  try {
    const results = await contactsService.getAll();
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
  try {
    const { id } = req.params;
    const results = await contactsService.getOne(id);
    if (!results) {
      return res.status(404).json({
        status: "not-found",
        code: 404,
        data: {
          message: "Contact not found",
        },
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      data: {
        message: error.message,
      },
    });
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { body } = req;
    console.log(body);
    const results = await contactsService.create(body);
    res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const results = await contactsService.update(id, body);
    res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const results = await contactsService.updateFavorite(id, favorite);
    res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await contactsService.remove(id);
    res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
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
  remove,
};

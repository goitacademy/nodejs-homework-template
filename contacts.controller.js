const contactsService = require("./contacts.service");

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
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await contactsService.getOne(id);

    if (!results) {
      res.status(404).json({
        status: "not found",
        code: 404,
        data: {contact: results}
      });
    }
    
    res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: e,
      code: 400,
      data: {
        message: e.message,
      }
    });
  }
};

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const results = await contactsService.create(body);
    res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
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
        contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const results = await contactsService.updateStatus(id, favorite);
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

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await contactsService.remove(id);
    res.json({
      status: "success",
      code: 200,
      data: {
        status: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  updateStatus,
  remove,
  update,
};

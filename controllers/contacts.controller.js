const contactsService = require("../service/contacts.service");

const get = async (req, res) => {
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
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await contactsService.getOne(id);

    console.log(results);
    if (!results) {
      return res.status(404).json({
        status: 404,
        statusText: "Not Found",
        message: `Not found contact by id: ${id}`,
      });
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        results,
      },
    });
  } catch (e) {
    return res.status(404).json({
      status: 404,
      message: "Not Found",
    });
  }
};

const create = async (req, res) => {
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
    return res.status(404).json({
      status: 404,
      message: "Not Found",
    });
  }
};

const update = async (req, res) => {
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
    return res.status(404).json({
      status: 404,
      message: "Not Found",
    });
  }
};

const updateStatus = async (req, res) => {
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
    return res.status(404).json({
      status: 404,
      message: "Not Found",
    });
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
    return res.status(404).json({
      status: 404,
      message: "Not Found",
    });
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

const service = require("../services/contacts.service");

const get = async (req, res, next) => {
  try {
    const { query } = req;
    const results = await service.getAll(query);

    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error("Error handling GET /api/contacts:", e);
    res.status(500).json({ error: "Internal Server Error" });
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await service.getOne(id);

    if (!results) {
      res.status(404).json({
        status: "Contact not found",
        code: 404,
        data: {
          contact: results,
        },
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error("Error handling GET /api/contacts:", e);
    res.status(500).json({ error: "Internal Server Error" });
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const results = await service.create(body);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact: results,
      },
    });
  } catch (e) {
    console.error("Error handling POST /api/contacts:", e);
    res.status(500).json({ error: "Internal Server Error" });
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    if (!body) {
      res.status(400).json({ message: "missing fields" });
    }

    const results = await service.update(id, body);

    if (results) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: results },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error("Error handling POST /api/contacts/:id:", e);
    res.status(500).json({ error: "Internal Server Error" });
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await service.remove(id);

    if (results) {
      res.json({
        status: "success",
        code: 200,
        data: { task: results },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error("Error handling DELETED /api/contacts/:id:", e);
    res.status(500).json({ error: "Internal Server Error" });
    next(e);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    if (!favorite) {
      res.status(400).json({ message: "missing field favorite" });
    }

    const results = await service.updateStatusContact(id, favorite);

    if (results) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: results },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error("Error handling UPDATE FAVORITE /api/contacts/:id:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
  updateFavorite,
};

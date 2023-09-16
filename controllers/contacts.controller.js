const contactService = require("../services/contact.service");

const listContacts = async (req, res, next) => {
  try {
    const { query } = req;
    const results = await contactService.listContacts(query);
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

const getContactById = async (req, res) => {
  try {
    const { params, user } = req;
    const { id } = params;
    const results = await contactService.getContactById(id, user._id);

    if (!results) {
      return res.status(404).json({
        status: "Not found",
        code: 404,
        data: {
          contact: results,
        },
      });
    }
    return res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      data: {
        message: error.message,
      },
    });
  }
};

const addContact = async (req, res, next) => {
  try {
    const { body, user } = req;
    const results = await contactService.addContact({
      ...body,
      owner: user._id,
    });
    return res.json({
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

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body, user } = req;
    const results = await contactService.updateContact(id, user._id, body);
    return res.json({
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
    const { body, params, user } = req;
    const { id } = params;
    const { favorite } = body;
    const results = await contactService.updateFavorite(id, user._id, favorite);
    return res.json({
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

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const results = await contactService.removeContact(id, user._id);
    return res.json({
      status: "success",
      code: 200,
      data: {
        id,
        data: {
          contact: results,
        },
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavorite,
  removeContact,
};

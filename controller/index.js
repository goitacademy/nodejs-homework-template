const contactsFunctions = require("../service/index");

const getController = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        contacts: await contactsFunctions.listContacts(),
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const getByIdController = async (req, res, next) => {
  try {
    const result = await contactsFunctions.getContactById(req.params.contactId);

    if (result) {
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          contacts: result,
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      code: 404,
      messege: `Contact with ${req.params.contactId} not found`,
    });
  }
};
const addController = async (req, res, next) => {
  const body = req.body;
  try {
    const addContact = await contactsFunctions.addContact(body);

    if (addContact) {
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          contacts: addContact,
        },
      });
    }
  } catch (error) {
    console.log(error.code);
    if (error.code === 11000) {
      return res.status(400).json({ message: " Пользователь уже есть " });
    }
    next(error);
  }
};
const deleteController = async (req, res, next) => {
  try {
    const result = await contactsFunctions.removeContact(req.params.contactId);
    if (result) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { message: "contact deleted" },
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contact with ${req.params.contactId} id`,
    });
  }
};
const putController = async (req, res, next) => {
  const body = req.body;
  try {
    const putContact = await contactsFunctions.updateContact(
      req.params.contactId,
      body
    );
    if (Object.keys(body).length === 0) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
    }

    if (putContact) {
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          contacts: putContact,
        },
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
};
const favoriteController = async (req, res, next) => {
  const body = req.body;
  try {
    const result = await contactsFunctions.updateContact(
      req.params.contactId,
      body
    );

    if (result) {
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          contacts: result,
        },
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
};
module.exports = {
  getController,
  getByIdController,
  addController,
  deleteController,
  putController,
  favoriteController,
};

const {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../service/index");

const getContactsController = async (req, res, next) => {
  try {
    const data = await getAllContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: data,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await getContactById(id);
    if (data) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: data,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const addContactController = async (req, res, next) => {
  const { body } = req;
  try {
    const data = await addContact(body);
    res.json({
      status: "success",
      code: 200,
      data: {
        contact: data,
      },
    });
  } catch (err) {
    if (err.message.includes("duplicate")) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `its duplicate contact: ${body.name}, ${body.email}, ${body.phone}`,
        data: "its duplicate contact",
      });
    } else {
      console.error(err);
    }
    next(err);
  }
};

const updateContactController = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const data = await updateContact(id, body);
    if (data) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: data,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const removeContactController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await removeContact(id);
    if (data) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: data,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateStatusContactController = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  if (!body) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Missing field favorite`,
      data: "Not Found",
    });
    return;
  }
  try {
    const data = await updateStatusContact(id, body);
    if (data) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: data,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController,
  updateStatusContactController,
};

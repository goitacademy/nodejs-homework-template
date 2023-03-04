const Contact = require("../models/contacts");

const createError = require("http-errors");
const {
  addPostsValidation,
  updatePostValidation,
} = require("../middleware/validationMiddleware");

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return next(createError(404, `Contact with id ${id} not found`));
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error)
  }
};
const deleteContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndRemove(id);
    if (!deletedContact) {
      throw createError(404);
    }

    res.json({
      status: "success",
      code: 200,
      message: `Contact with id ${id} has been deleted`,
      data: {
        deletedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const addContactController = async (req, res, next) => {
  try {
    const { error } = addPostsValidation.validate(req.body);
    if (error) {
      return next(createError(404, error.message));
    }
    const addContact = await Contact.create(req.body);
    res.json({
      status: "success",
      code: 201,
      data: {
        addContact,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const { error } = updatePostValidation.validate(req.body);
    if (error) {
      return next(createError(404, error.message));
    }
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body);
    if (!updatedContact) {
      return next(createError(404, `Something went wrong`));
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        updatedContact,
      },
    });
  } catch (error) {
   next(error);
  }
};

const updateStatusContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );

    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }

    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  deleteContactController,
  addContactController,
  updateContactController,
  updateStatusContactController
};

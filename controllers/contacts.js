const CreateError = require("http-errors");
const { addContactSchema, patchContactSchema } = require("../schemas");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json({
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) {
      throw new CreateError(404);
    }

    res.json({
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const addNewCont = async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }

    const result = await addContact(req.body);
    res.status(201).json({
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await removeContact(contactId);

    if (!result) {
      throw new CreateError(404);
    }

    res.json({
      message: "Contact Deleted",
    });
  } catch (error) {
    next(error);
  }
};

const changeContact = async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    console.log(result);
    if (!result) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }
    res.json({
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const changeContactStats = async (req, res, next) => {
  try {
    const { error } = patchContactSchema.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    console.log(result);
    if (!result) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }
    res.json({
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getById,
  addNewCont,
  deleteContact,
  changeContact,
  changeContactStats,
};
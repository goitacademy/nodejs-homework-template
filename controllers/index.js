const {
  joiSchema,
  joiSchemaForUpdate,
  joiSchemaForFavorite,
} = require("../middlevares/contactsvalidate");
const { HttpErr } = require("../middlevares/error");
const Contact = require("../schemas/mongooseSchemas");

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    if (result.length === 0) {
      throw HttpErr(404, "Contacts not found");
    }
    res.json({
      status: 200,
      result,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId, "-createdAt -updatedAt");

    if (!result) {
      throw HttpErr(404, "Contact not found");
    }

    res.json({
      status: 200,
      result,
    });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw HttpErr(400, error.message);
    }
    const data = req.body;
    const result = await Contact.create(data);

    return res.json({
      status: 201,
      message: "Contact created successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

const changeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const { error } = joiSchemaForUpdate.validate(req.body);

    if (error) {
      throw HttpErr(400, error.details[0].message);
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        name,
        email,
        phone,
      },
      { new: true }
    );

    if (!updatedContact) {
      throw HttpErr(404, "Contact not found");
    }

    res.json({
      status: 200,
      message: "Contact updated successfully",
      data: {
        updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const changeFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = joiSchemaForFavorite.validate(req.body);

    if (error) {
      throw HttpErr(400, error.details[0].message);
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      throw HttpErr(404, "Contact not found");
    }

    res.json({
      status: 200,
      message: "Contact updated successfully",
      data: {
        updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    return res.json({
      status: 200,
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  addContact,
  changeContact,
  changeFavorite,
  deleteContact,
};

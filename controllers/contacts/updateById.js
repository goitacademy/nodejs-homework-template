const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");
const contactSchema = require("../../schema/contacts");

const updateById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const id = req.params.contactId;
    console.log(req.params);

    const updateById = await contactsOperations.updateContact(id, req.body);

    if (!updateById) {
      throw new createError.NotFound(
        `Contact with this id: ${id} is not found`
      );
    }

    res.status(201).json({
      status: "success",
      code: 201,
      result: updateById,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;

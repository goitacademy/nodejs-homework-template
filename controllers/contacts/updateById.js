const { joiSchema } = require("../../models");
const { Contact } = require("../../models");

const updateById = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const id = req.params.contactId;
    // console.log(req.params);

    const updateById = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateById) {
      const error = new Error(`Contact with this id: ${id} is not found`);
      error.status = 404;
      throw error;
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

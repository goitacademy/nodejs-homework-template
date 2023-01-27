const createError = require("http-errors");
const { Contact } = require("../../models");

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const contactByID = await Contact.findById(id); // findOne({ _id: id })

    if (!contactByID) {
      throw new createError.NotFound(
        `Contact with this id: ${id} is not found`
      );
    }
    res.json({
      status: "success",
      code: 200,
      result: { contactByID },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;

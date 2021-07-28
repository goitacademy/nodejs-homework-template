const { Contact } = require("../../models/index");

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.findOne({ _id: contactId });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      code: 404,
      data: "Not found",
    });
  }
};

module.exports = getById;

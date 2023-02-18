const { Contact } = require("../../models/index");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // const contact = await Contact.findOne({_id: contactId});
    const result = await Contact.findById(contactId);

    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: { result: result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;

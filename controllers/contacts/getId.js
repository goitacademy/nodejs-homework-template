const contactOperations = require("../../models");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contactOperations.getContactById(contactId);
    if (!contactById) {
          return res.status(404).json({ message: "Bad request" })
    }
    res.json({
      status: "Success",
      code: 200,
      result: contactById,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
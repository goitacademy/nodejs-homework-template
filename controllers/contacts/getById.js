const { contacts: service } = require("../../services");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await service.getById(contactId);
    if (!result) {
      res.status(404).json({
        status: "sucess",
        code: 404,
        message: `Contact with id = ${contactId} not found`,
      });
    }
    res.json({
      status: "sucess",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;

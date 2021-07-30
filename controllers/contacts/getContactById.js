const { contact: service } = require("../../services");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await service.getContactById(contactId);
    if (!result) {
      return await res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    await res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;

const { getContactById } = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await getContactById(contactId);

    if (!result) {
      res.json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }

    res.json({
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

module.exports = getById;
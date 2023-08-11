const { getContactById } = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await getContactById(contactId);

    if (!result) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
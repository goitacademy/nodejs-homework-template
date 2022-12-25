const { getContactById } = require("../../models/contacts");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  try {
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = getById;

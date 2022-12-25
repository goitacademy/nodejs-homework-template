const { removeContact } = require("../../models/contacts");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  try {
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: { result },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = removeById;

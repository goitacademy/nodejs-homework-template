const service = require("../../service/index");

const showContacts = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.getContactById(contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { findContact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found Contact with id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = showContacts;

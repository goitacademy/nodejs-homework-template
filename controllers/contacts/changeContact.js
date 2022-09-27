const { service } = require("../../service");

const changeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    const result = await service.updateContact(contactId, body);

    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
module.exports = changeContact;

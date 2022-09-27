const { service } = require("../../service");

const changeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    const result = await service.updateContact(contactId, body);

    res.json({
      status: "success",
      code: 200,
      data: { contact: result },
    });
  } catch (e) {
    res.status(404).json({
      status: "error",
      message: `Not found contact id: ${contactId}`,
    });
  }
};
module.exports = changeContact;

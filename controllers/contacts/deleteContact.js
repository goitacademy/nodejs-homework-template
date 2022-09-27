const { service } = require("../../service");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.removeContact(contactId);

    res.json({
      status: "success",
      code: 200,
      data: { contact: result },
    });
  } catch (e) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contact id: ${contactId}`,
    });
  }
};
module.exports = deleteContact;

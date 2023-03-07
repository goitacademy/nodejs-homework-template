const service = require("../../service/service");

const changeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
    const updatedContact = await service.updateContact(contactId, body);
    if (updatedContact) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: updatedContact,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact ${contactId} can not be deleted `,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
  }
};

module.exports = changeContact;
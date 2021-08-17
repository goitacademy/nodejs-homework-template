const { contacts: service } = require("../../services");

const updateStatus = async (req, res, next) => {
  try {
      const contact = await service.updateContact(
      req.params.contactId,
      req.body
    );
    if (!body) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing field favorite"
      });
    }
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "contact update",
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatus;
const service = require("../../service/service");

const updateStatus = async () => {
  const { contactId } = req.params;
  const { body } = req;

  const updatedStatus = await service.updateStatus(contactId, body);
  try {
    if (updatedStatus) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: updatedStatus,
        },
      });
    } else {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `"Missing field favorite"`,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
  }
};

module.exports = updateStatus;
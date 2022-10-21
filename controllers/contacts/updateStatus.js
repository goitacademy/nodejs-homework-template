const Contact = require("../../model/contacts");

const updateStatus = async () => {
  const { contactId } = req.params;
  const { body } = req;

  const updatedStatus = await Contact.findByIdAndUpdate(
    { _id: contactId },
    body,
    { new: true }
  );
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

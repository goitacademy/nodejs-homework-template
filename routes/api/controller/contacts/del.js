const { Contact } = require("../../models/index");

const del = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndDelete({ _id: contactId });
    res.json({
      status: "success",
      code: 204,
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
};

module.exports = del;

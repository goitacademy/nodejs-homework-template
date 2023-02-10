const service = require("../../service/service");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const searchedContact = await service.getContactById(contactId);

    if (searchedContact) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: searchedContact },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact ${contactId} is not found `,
        data: "Not Found",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
  }
};

module.exports = getContactById;
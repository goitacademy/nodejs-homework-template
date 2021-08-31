const { contacts: service } = require("../../services");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await service.removeById(contactId);

  if (!result) {
    res.status(404).json({
      status: "sucess",
      code: 404,
      message: `Contact with id = ${contactId} not found`,
    });
  }
  res.json({
    status: "sucess",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = removeContact;

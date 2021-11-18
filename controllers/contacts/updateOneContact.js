const updateContact = require("../../model/contacts/updateContact");

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      res
        .status(404)
        .json({ message: `Contact with id=${contactId} not found` });
    }
    res.json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;

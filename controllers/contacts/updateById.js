const { updateContact } = require("../../models/contacts");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
    res.json({
      status: "success",
      code: 200,
      data: { result: await updateContact(contactId, body) },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = updateById;

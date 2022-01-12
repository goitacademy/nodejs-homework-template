const { NotFound } = require("http-errors");
const { removeContact } = require("../../model");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contacts = await removeContact(contactId);
    if (!contacts) {
      throw new NotFound(`Product with id ${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: `Contact with id ${contactId} deleted`,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;

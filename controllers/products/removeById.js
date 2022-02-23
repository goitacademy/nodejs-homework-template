const createError = require("http-errors");
const contacts = require("../../models/contacts");

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeById(id);
    if (!result) throw new createError(404, "Not found");
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;

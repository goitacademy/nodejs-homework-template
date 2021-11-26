const Contact = require("../../model/contacts");
const createError = require("http-errors");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const update = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!update) {
    throw createError(404, "Not found");
  }
  res.json({
    status: "succsess",
    code: 200,
    result: update,
  });
};

module.exports = updateById;

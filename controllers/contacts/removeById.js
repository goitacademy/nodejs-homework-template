const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound(`Контакт з таким id=${contactId} в базі не знайдено!`);
  }

  res.json({
    status: "success",
    code: 200,
    message: "Контакт видалено",
    data: {
      result,
    },
  });
};

module.exports = removeById;

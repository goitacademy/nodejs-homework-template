const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw new NotFound(`Контакт з таким id=${id} в базі не знайдено!`);
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

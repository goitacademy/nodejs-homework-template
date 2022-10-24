const { NotFound } = require("http-errors");
const { Contact } = require("../../models");
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw new NotFound(`Контакт з таким id=${id} в базі не знайдено!`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result: result,
    },
  });
};

module.exports = getById;

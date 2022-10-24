const { NotFound } = require("http-errors");
const { Contact } = require("../../models");
const getById = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new NotFound(`Контакт з таким id=${contactId} в базі не знайдено!`);
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

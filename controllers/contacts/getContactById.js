const { Contact } = require("../../models");
const createError = require("http-errors");

const getContactById = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const result = await Contact.findById(id);

  if (!result) {
    throw createError(404, `contact with id: ${id} not found`);
  }

  res.json({
    status: "succes",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContactById;

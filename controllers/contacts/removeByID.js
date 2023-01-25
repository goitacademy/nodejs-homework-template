const { Contact } = require("../../models/contact");

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);

  res.json({
    status: "success",
    code: 200,
    message: `contact with id:${id} deleted`,
    data: {
      result,
    },
  });
};

module.exports = removeById;

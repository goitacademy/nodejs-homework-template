const contactsOperations = require("../../models/contacts");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperations.updateById(id, req.body);
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateById;

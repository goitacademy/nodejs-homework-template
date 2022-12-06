const { getContactById } = require("../../models/contacts");

const findContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = findContactById;

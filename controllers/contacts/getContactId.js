const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const getContactId = async (req, res) => {
  const { contactId } = req.params;
  const resultId = await Contact.findById(contactId); // findOne({_id:contactId}) - спосіб шукати по ID

  if (!resultId) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: resultId,
    },
  });
};
module.exports = getContactId;

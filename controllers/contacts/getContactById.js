const { HTTP400Error } = require("../../helpers/errorHandlers");
const { getContactById } = require("../../services/contacts");

const getContactByIdHandler = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw new HTTP400Error("Bad Request, change query parameters");
  }
  return res.json({ data: result, status: "success", code: 200 });
};

module.exports = getContactByIdHandler;

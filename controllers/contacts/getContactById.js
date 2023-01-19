const { Contacts } = require("../../model");
const { NotFound } = require("http-errors");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findById({ contactId });
  if (!result) {
    throw new NotFound(`Contact with id:${contactId} not found`);
  }
  return res.status(200).json(result);
};

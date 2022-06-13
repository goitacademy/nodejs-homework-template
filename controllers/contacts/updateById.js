import operations from "../../models/contacts/index.js";
import createError from "http-errors";

const { NotFound } = createError;

export const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await operations.updateContactById(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact edited",
    data: {
      result,
    },
  });
};

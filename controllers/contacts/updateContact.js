const { Contact } = require("../../models");
const { HttpError } = require("../../utils");

const updateContact = async (request, response) => {
  const { id } = request.params;
  const result = await Contact.findByIdAndUpdate(id, request.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json({
    status: "success",
    message: "update contact",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContact;

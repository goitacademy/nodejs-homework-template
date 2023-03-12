const { Contact } = require("../../models");
const { HttpError } = require("../../utils");

const getContactById = async (request, response) => {
  const { id } = request.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  response.json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = getContactById;

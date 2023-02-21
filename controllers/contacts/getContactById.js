const { Contact } = require('../../models/index');
const { HttpSuccess, HttpError } = require('../../helpers');

const getContactById = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findById(id);

  if (!data) {
    throw HttpError({ status: 404, message: "Contact doesn't exist" });
  }
  res.json(HttpSuccess({ data }));
};
module.exports = getContactById;

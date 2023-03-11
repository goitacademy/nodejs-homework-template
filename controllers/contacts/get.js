const {Contact} = require('../../model/contactSchema');
const {HttpError} = require('../../helpers')

const get = async (req, res) => {
  const { __id: owner } = req.user;
  // const {page, qu}
  const result = await Contact.find({owner} ).populate("owner", "name email")
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: `we find ${result.length} contacts`,
    data: result
  });
}

module.exports = get;

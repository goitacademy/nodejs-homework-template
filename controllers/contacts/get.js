const {Contact} = require('../../model/contactSchema');
const {HttpError} = require('../../helpers')

const get = async (req, res) => {
  const {_id: owner } = req.user;
  const { page = 1, limit = 5, favorite } = req.query;
  console.log(req.query)
  const skip =(page -1) * limit
  const result = await Contact.find({owner, favorite}, "", {skip, limit} ).populate("owner", "name email")

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

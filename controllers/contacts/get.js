const { Contact } = require('../../model/contactSchema');
const { HttpError } = require('../../helpers')

const get = async (req, res) => {
   const result = await Contact.find()
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

const { Contact } = require('../../model/contactSchema');
const { HttpError } = require('../../helpers')

const remove = async (req, res) => {
   const { id } = req.params;
   const result = await Contact.findByIdAndRemove(id);
   if (!result) {
      throw HttpError(404, "Not found");
   }
   res.status(202).json({
      staus: "success",
      code: 202,
      message: `Delete success.Contact with id ${id} is removed`,
      data: result
   });
}
module.exports = remove
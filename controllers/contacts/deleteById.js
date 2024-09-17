const {Contact}=require('../../models/contact')
const {HttpErrors}=require('../../helpers')
const deleteById=async (req, res, next) => {
      const { id } = req.params;
      const deletedContact = await Contact.findByIdAndRemove(id).exec();
      if (!deletedContact) {
        throw HttpErrors(404, "Not found contact")
      }else{
        res.json({ message: "contact deleted" });
      }
  }

  module.exports=deleteById
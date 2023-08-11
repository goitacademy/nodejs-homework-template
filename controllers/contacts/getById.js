const {Contact}=require('../../models/contact')
const {HttpErrors}=require('../../helpers')
const getById=async (req, res, next) => {
      const { id } = req.params;
      const oneContact = await Contact.findById(id);
      if (!oneContact) {
        next(HttpErrors(404, "Not found contact"))
      }else{
        return res.json({
          status: "success",
          code: 200,
          data: {
            oneContact,
          },
        });
      }
      
  }

  module.exports=getById
const {Contact}=require('../../models/contact')
const {HttpErrors}=require('../../helpers')
const updateById=async (req, res, next) => {
      const {id}=req.params;
      const body=req.body;
      const updatedContact=await Contact.findByIdAndUpdate(id, body, {new: true}).exec();
      if(!updatedContact){
        next(HttpErrors(404, 'Not found' ))
      } else{
        res.json({
          status:'success',
          code:200,
          data:{
            updatedContact
          }
        })
      }
    }

    module.exports=updateById
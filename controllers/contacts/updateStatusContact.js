const {Contact}=require('../../models/contact')
const {HttpErrors}=require('../../helpers')

const updateStatusContact=async (req, res, next) => {
      const {id}=req.params;
      const body=req.body;
      const updatedContact=await Contact.findByIdAndUpdate(id, body, {new: true})
      if(!updatedContact){
        next(HttpErrors(404, 'Not found'))
      }else{
        res.json({
          status:'success',
          code:200,
          data:{
            updatedContact
          }
        })
      }
      
    }

    module.exports=updateStatusContact
const {contacts}=require('../../models')
const updateById=async (req, res, next) => {
      const {contactId}=req.params;
      const body=req.body;
      const updatedContact=await contacts.updateContact(contactId, body)
      if(!updatedContact){
        const error=new Error('Not found');
        error.status=404;
        throw error
      }
      res.json({
        status:'success',
        code:200,
        data:{
          updatedContact
        }
      })
    }

    module.exports=updateById
const { Contacts } = require('../models/contacts');


const checkMiddlewar = async(req,res,next) => { 
    try {        
        const { id } = req.params;
        if (id.length > 10) {
            
            const err = new Error('Invalid ID')
            err.status = 404
            return next(err)
        }
        const contacts = await Contacts()
        
        const contact = contacts.find(item => item.id === `${id}`)
        // if (contact) {
        //     res.status(200).json({ contact })
        //     return contact
        //   }
          if (!contact) {
              
            res.status(404).json({
              message : 'Oops! Contact doesnt exist'
            })
          }
          next()
    } catch (error) {
        next(error)
    }
}
module.exports = checkMiddlewar
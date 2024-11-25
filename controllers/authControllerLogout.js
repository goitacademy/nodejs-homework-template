const User = require("../models/contactModal")



const authControllerLogout = async (req, res, next) => {
    const contact = req.user
    console.log('contact: ', contact.id);
    
    const updatedContact = await User.findOneAndUpdate(
        { _id: contact.id },
        { token: undefined },
        { new: true }
    )
    res.status(200).json({
        updatedContact 
    })
  
  
    
  
   
  }

module.exports = authControllerLogout
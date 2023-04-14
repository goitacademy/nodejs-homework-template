const User = require('../models/contactModal');

const checkMiddlewar = async(req,res,next) => { 
  try {
    const { id } = req.params;
    const user = await User.findById(id)
    if (id.length < 15) {
            
      const err = new Error('Invalid ID')
      err.status = 404
      return next(err)
  }
  if (!user) {         
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
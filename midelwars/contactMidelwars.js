const fs = require('fs').promises;

exports.chekContact = async (req, res, next) => {
    try {
      const { id } = req.params;    
      
      const dataFormDB = await fs.readFile('models/contacts.json');
  
      const contacts = JSON.parse(dataFormDB);
      const contact = contacts.find((item) => item.id === id);
  
      if (!contact) {
        return res.status(404).json({
          message: "Not found"
        });      
      }
      req.contact = contact;
      res.status(200).json({contact});
  
      next();
    } catch (err) {
      console.log(err);
    }
  }
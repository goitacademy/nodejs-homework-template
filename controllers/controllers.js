const Contact = require("../models/contact");
const { HttpError, contactSchemaJoi ,contactUpdateFavorite} = require('../utils/index');


async function getAll(req, res, next) {
  try {
     const { _id: owner } = req.user;     
     const result = await Contact.find({owner}).populate("owner", "email");
    
    if (!result) {
        throw HttpError(404, "Not Found");  
    }
    
     res.json(result); 
    }
   catch (error) {
      next(error)
    }  
};


async function getContactById(req, res, next) {
  try {
     const {id} = req.params
     const result = await Contact.findById(id);

     if (!result) {
       throw HttpError(404, "Not Found");
     }

     res.json(result);
   } 
    catch (error) {
    next(error)
  }
};

async function postContact(req, res, next) {
        
  try {
       const { _id: owner } = req.user;  

       const { error } = contactSchemaJoi.validate(req.body);
       
       if (error) {
         throw HttpError(400, "missing required name field");
       }

      const body = req.body;
    Contact.create({ ...body, owner});     
      res.status(201).json({body});
     } catch (error) {
         next(error)
    };
};


async function putContact(req, res, next) {
    try {
    const { error } = contactSchemaJoi.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!result) {
      throw HttpError(404, "Not Found");
    }
      res.json(result);
      
  } catch (error) {
    next(error)
  }
};


async function patchContact(req, res, next) {
    try {
    const { error } = contactUpdateFavorite.validate(req.body);
    if (error) {
      throw  HttpError(400, "missing field favorite");
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
      
  } catch (error) {
    next(error)
  }
  
};

async function deleteContact(req, res, next) {
     try {
       const { id } = req.params;
       const result = await Contact.findByIdAndDelete(id);
    
       if (!result) {
         throw HttpError(404, "Not Found");
       }
    
       res.json({message: "contact deleted"});

     } catch (error) {
         next(error)
      }  
};  



module.exports = {
    getAll,
    getContactById,
    postContact,
    putContact,
    patchContact,
    deleteContact,
} 
const express = require('express');
const Contact = require("../../models/contact");
const utils = require("../../utils/index");
const { isValidId } = require("../../middlewares/index");

const router = express.Router()


router.get('/', async (req, res, next) => {
  try {
     const result = await Contact.find();
    
    if (!result) {
        throw utils.HttpError(404, "Not Found");  
    }
    
     res.json(result); 
    }
   catch (error) {
      next(error)
    }  
})



router.get('/:id', isValidId, async (req, res, next) => { 
  try {
     const {id} = req.params
     const result = await Contact.findById(id);

     if (!result) {
       throw utils.HttpError(404, "Not Found");
     }

     res.json(result);
   } 
    catch (error) {
    next(error)
  }
})



router.post('/', async (req, res, next) => {

     try {
       const { error } = utils.contactSchemaJoi.validate(req.body);
       
       if (error) {
         throw utils.HttpError(400, "missing required name field");
       }

      const body = req.body;
      Contact.create(body);     
      res.status(201).json(body);
     } catch (error) {
         next(error)
      }
})



router.delete('/:id' , isValidId , async (req, res, next) => {
  try {
       const { id } = req.params;
       const result = await Contact.findByIdAndDelete(id);
    
       if (!result) {
         throw utils.HttpError(404, "Not Found");
       }
    
       res.json({message: "contact deleted"});

     } catch (error) {
         next(error)
      }
})



router.put('/:id', isValidId, async (req, res, next) => {
  try {
    const { error } = utils.contactSchemaJoi.validate(req.body);
    if (error) {
      throw utils.HttpError(400, "missing fields");
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!result) {
      throw utils.HttpError(404, "Not Found");
    }
 
    res.json(result);
      
  } catch (error) {
    next(error)
  }
});


router.patch("/:id/favorite", isValidId, async (req, res, next) => {
   try {
    const { error } = utils.contactUpdateFavorite.validate(req.body);
    if (error) {
      throw utils.HttpError(400, "missing field favorite");
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!result) {
      throw utils.HttpError(404, "Not Found");
    }
    res.json(result);
      
  } catch (error) {
    next(error)
  }
  

});


module.exports = router

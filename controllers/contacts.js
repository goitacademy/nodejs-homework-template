// const contacts = require("../models/contacts");
const Joi = require("joi");
const { HttpError, ctrlWrapper } = require("../helpers");
const Contact = require("../models/contact");
// const { set } = require("../app");

const checkShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const checkShemaStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const getAll = async (req, res) => {
    
    const { _id } = req.user; 

    // for pagination
    // const { page = 2, limit = 2 } = req.query;

    // const skip = (page - 1) * limit;

    // skip - how many elements skip, limit - how many return.
    // const result = await Contact.find({owner: _id}, {skip, limit});
    
    const result = await Contact.find({owner: _id});
    res.status(200).json(result);
   
};

const getById = async (req, res) => {
    
      const { _id } = req.user; 
      const { contactId } = req.params;
      const result = await Contact.find({owner: _id, _id: contactId});
      if (result === null || result.length === 0) {
        // first variant
        //return res.status(404).json({ message: "Not found" });
        // second variant
        // const error = new error("Not found");
        // error.status = 404;
        // third variant
        throw HttpError(404, "Not found");
      }
      res.status(200).json(result);
};

const addContact = async (req, res) => {
   
      const { body } = req;
      const { error } = checkShema.validate(body);
      // check body data first variant
      // if (body.name && body.email && body.phone) {
  
      // check body data second variant
      if (error) {
        throw HttpError(
          400,
          `missing required ${error.message
            .split(" ")
            .filter(
              (value) =>
                value !== "is" && value !== "required" && value !== "field"
            )} field`
        );
      }
  
    //   const result = await contacts.addContact(body);

      const { _id } = req.user; 

      const newContact = await Contact.create({...body, owner: _id});

      res.status(201).json(newContact);
 
  };

  const deleteContact = async (req, res) => {
    
      const { _id } = req.user; 
      
      const { contactId } = req.params;

      // find by owner and id and delete
      const result = await Contact.findOneAndDelete({owner: _id, _id: contactId});
  
      if (result === null) {
        throw HttpError(404, "Not found");
      }
  
      res.status(200).json({ message: "contact deleted" });
   
  };

  const updateContact = async (req, res) => {
   
      const { _id } = req.user;
      const { contactId } = req.params;
  
      const { body } = req;
      const { error } = checkShema.validate(body);
  
      if (error) {
        throw HttpError(
          400,
          `missing required ${error.message
            .split(" ")
            .filter(
              (value) =>
                value !== "is" && value !== "required" && value !== "field"
            )} field`
        );
      }
  
      // find by 'owner' and id and update
      const result = await Contact.findOneAndUpdate({owner: _id, _id: contactId}, body, {new: true});
  
      if (result === null) {
        throw HttpError(404, "Not found");
      }
      res.status(201).json(result);
  
  };

  const updateStatusContact  = async (req, res) => {
   
    const { _id } = req.user; 
    const { contactId } = req.params;

    const { body } = req;
    const { error } = checkShemaStatus.validate(body);

    if (error) {
      throw HttpError(
        400,
        `missing ${error.message
          .split(" ")
          .filter(
            (value) =>
              value !== "is" && value !== "required" && value !== "field"
          )} field`
      );
    }

    // Replace the value of the "favorite" ($set operator) field or add it if it does not exist
    // oneUpdate()
    const result = await Contact.findOneAndUpdate({owner: _id, _id: contactId},{$set:{favorite: body.favorite}});

    if (result === null) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(await Contact.findById(contactId));

}

  module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
  };
// const { ObjectId } = require("mongodb");
const { Contact }  = require("../models/contact");
const HttpError = require("../helpers/HttpError.js");

async function getContacts(req, res, next) {
  console.log(req.user.id);
  try {
    const userId = req.user.id;
    const contacts = await Contact.find({ownerId: userId});
      
    res.send(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  const { id } = req.params;
  
  try {
    const userId = req.user.id;
      const contact = await Contact.findById(id);
      
      if (contact === null) {
        next(HttpError(404, "Not found"));
        // return res.status(404).json({ message: "Not found" });;
      }
      if (contact.ownerId.toString() !== userId) {
        // return res.status(403).send("Forbidden");
        next(HttpError(404, "Contact not found"));
        // return res.status(404).send("Contact not found");
      }
      res.send(contact);
    
   
  } 
  catch (error) {
    next(HttpError(400, "not valid Id"));
    // res.status(400).json({ message: 'not valid Id' });
  }
}

async function createContact(req, res, next) {
 
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    ownerId: req.user.id,
    
  };

  try {
    const result = await Contact.create(contact);

    res.status(201).send(result);
  } catch (error) {
    next(HttpError(400, "missing required name field"));
    // res.status(400).json({ message: 'missing required name field' });
  }
}

async function updateContact(req, res, next) {
  const { id } = req.params;
  
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
    
  };

   if (contact.name === undefined && contact.email === undefined && contact.phone === undefined) {
       next(HttpError(400, "Body is empty"));
        // return res.status(400).json({ message: "Body is empty" });
      } ;
  try {
    const result = await Contact.findByIdAndUpdate(id, contact, { new: true });

      if (result === null) {
        next(HttpError(404, "Not found"));
        // return res.status(404).json({ message: "Not found" });
      }  res.send(result);
  
   
  } catch (error) {
    next(HttpError(404, "not valid Id"));
    // res.status(400).json({ message: 'not valid Id' });
    
  }
}

async function deleteContact(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(id);

    if (result === null) {
      next(HttpError(404, "Not found"));
      // return res.status(404).json({ message: 'Not found' });;
    }

    res.send({ id });
  } catch (error) {
    next(HttpError(404, "not valid Id"));
    // res.status(400).json({ message: 'not valid Id' });
    
  }
}

async function changeContactFavorite(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndUpdate(
      id,
      {
        favorite: req.body.favorite,
      },
      { new: true }
    );
      console.log(req.body.favorite)
    if (req.body.favorite === undefined) {
      next(HttpError(400, "missing field favorite"));
      // return res.status(400).json({ message: "missing field favorite" });
    }
    if (result === null) {
      next(HttpError(404, "Not found"));
      // return res.status(404).json({ message: 'Not found' });
    }
    res.send(result);
  } catch (error) {
    next(HttpError(400, "not valid Id"));
    // res.status(400).json({ message: 'not valid Id' });
    
  }
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  changeContactFavorite,
};
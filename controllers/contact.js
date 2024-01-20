const Contact = require("../models/contact");

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find({});

    res.send(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  const { id } = req.params;

  try {
  
      const contact = await Contact.findById(id);

      if (contact === null) {
        return res.status(404).json({ message: "Not found" });;
      }
      
      res.send(contact);
    
   
  } 
  catch (error) {
    res.status(400).json({ message: 'not valid Id' });
  }
}

async function createContact(req, res, next) {
 
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
    
  };

  try {
    const result = await Contact.create(contact);

    res.status(201).send(result);
  } catch (error) {
    res.status(400).json({ message: 'missing required name field' });
  }
}

async function updateContact(req, res, next) {
  const { id } = req.params;

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
    
  };

  try {
    const result = await Contact.findByIdAndUpdate(id, contact, { new: true });

      if (result === null) {
        return res.status(404).json({ message: "Not found" });;
      }  res.send(result);
  
   
  } catch (error) {
    res.status(400).json({ message: 'not valid Id' });
    
  }
}

async function deleteContact(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(id);

    if (result === null) {
      return res.status(404).json({ message: 'Not found' });;
    }

    res.send({ id });
  } catch (error) {
    res.status(400).json({ message: 'not valid Id' });
    
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
      return res.status(400).json({ message: "missing field favorite" });
    }
    if (result === null) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: 'not valid Id' });
    
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
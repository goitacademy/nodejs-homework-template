const fs = require('fs').promises;
const path = require('path');
const { v4 } = require("uuid");

const contactPath = path.join("models","contacts.json" )
const getAllContacts = async () => {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data);
  return contacts
};


const listContacts = async (req, res, some) => {
  try {
    const contacts = await getAllContacts();
    return res.json(contacts)
  
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await getAllContacts();
    const contactById = await contacts.find((i) => i.id === contactId);
    if (!contactById) {
      return res.status(404).json({
        message: "Not found"
      })
    }
    return res.status(200).json(contactById)
  } catch (error) {
    console.log(error.message);
  }
};


const removeContact = async (req, res, next) => {
  const contacts = await getAllContacts();
  const { contactId } = req.params;
  const contactById = contacts.filter((i) => i.id !== contactId);
  if (contacts.length === contactById.length) {
    return res.status(404).json(
      {
        message:"Not found"
      }
    )
  };
  await fs.writeFile(contactPath, JSON.stringify(contactById));
  return res.status(200).json(
    {
      "message": "contact deleted"
    }
  );
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (name && email && phone) {
      const newContact = {
        id: v4(),
        name,
        email,
        phone
      };
      const contacts = await getAllContacts();
      const contactsNew = [...contacts, newContact]
      await fs.writeFile(contactPath, JSON.stringify(contactsNew))
      return res.status(201).json(newContact)
    }
    return
  }
  catch (error) {
    console.log(error);
  }
};


const updateContact = async (req,res,next) => {
  try {
    const {contactId} = req.params;
    const { name, email, phone } = req.body;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "missing fields"
      })
    }
    const contacts = await getAllContacts()
    const indexContact = await contacts.findIndex(i => i.id === contactId);
    if (indexContact === -1) {
      res.status(404).json({
        message:"Not found"
      })
    }
    contacts[indexContact] = {...contacts[indexContact], ...req.body}
    await fs.writeFile(contactPath, JSON.stringify(contacts))
    return res.status(200).json(
   contacts[indexContact]
    )
  }
  catch (error) {
  console.log(error.message);
}

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

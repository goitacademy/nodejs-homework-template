const {
    listContacts: list,
    getContactById: getById,
    removeContact: remove,
    addContact: add,
    updateContact: update,
} = require ("../models/contacts");

const Joi = require("joi");

const schemaCreateContact = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
});

const schemaUpdateContact = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
}).
or ("name", "email", "phone");

const listContacts = async (req, res, next) => {
    const allContacts = await list();
    res.status(200).json(allContacts);
};

const getContactById = async (req, res, next) => {
    const id = req.params.contactId
    const findContact = await getById(id);
    if (!findContact){
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(findContact)
  }

const addContact = async (req, res, next) => {
    const {name, email, phone} = req.body;
    const {error, value} = schemaCreateContact.validate({name, email, phone});
    if (error){
        return res.status(400).json({ message: "missing required name field" });
    }
    const newContact = await add(value);
    res.json({
        status: 'Success',
        code: 201,
        data: {
            newContact
        },
    });
  };

  const removeContact =  async (req, res, next) => {
    const id = req.params.contactId;
    const deleteContact = await remove(id);
    if (deleteContact === null){
        res.status(400).json({ message: "Not found" })
    }
  res.json({
    code: 200,
    message: "Contact deleted"
  });
};

const updateContact =async (req, res, next) => {
    const { contactId } = req.params;
    const { name, phone, email } = req.body;
    const { error, value } = schemaUpdateContact.validate({ name, phone, email })
  
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }
  
    const updContact = await update(contactId, value)
  
    if (updContact === null) {
      return res.status(404).json({ message: "Not found" });
    }
  
    res.json({
      status: 'success',
      code: 200,
      data: {
        updContact
      },
    })
  }

//   updateContact('41495006-441b-4456-9991-ac35131c4e91',{name: 'pedro', email: 'pedro@g.com'});

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
  };
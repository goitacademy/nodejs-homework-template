const express = require("express");
<<<<<<< HEAD
const { auth } = require("../../auth/auth.js");
const { schemaPut, schemaPost, schemaPatch } = require("../../schema.js");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getContactById(id);
    if (!user) {
      res
        .status(404)
        .json({ message: `Not found: there is no user with ${id} id` });
    } else {
      res.status(200).json({ user });
    }
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.post("/", auth, async (req, res, next) => {
  const { error } = schemaPost.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(404).json({ message: `${error.message}` });
  }
  try {
    const response = await addContact(req.body);
    return res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: "sth went wrong!!" });
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Id is required to perform delete");
  }
  try {
    await removeContact(id);
    return res.status(200).json({ message: `contact with ${id} id deleted` });
  } catch (err) {
    return res.status(500).send(`${err}`);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Id is required to perform put");
  }

  const { error } = schemaPut.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(404).json({ message: `${error.message}` });
  }
  try {
    const updatedContact = await updateContact(id, req.body);
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});

router.patch("/:id/favorite", auth, async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const { error } = schemaPatch.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(404).json({ message: `${error.message}` });
  }

  try {
    const updatedStatus = await updateStatusContact(id, favorite);
    if (updatedStatus) {
      res.status(200).json(updatedStatus);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});
=======
const {Contact} = require("../../models/contact");
const {addSchema, updateSchema, updateFavoriteSchema} = require("../../models/contact")
>>>>>>> 03ddca3ab856225ac93889b1ec630c997ac37fef

<<<<<<< HEAD
const {RequestError} = require("../../helpers");
const {isValidId, authenticate} = require("../../middlewares")

const router = express.Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10, favorite} = req.query;
    const skip = (page - 1) * limit;

    const filterContact = favorite ? { owner, favorite } : { owner };
    const result = await Contact.find(filterContact, "-createdAt -updatedAt", {skip, limit})
    .populate("owner", "name email");
  
    res.json(result)
  } 
  catch (error) {
    next(error)
  }
})

router.get('/:contactId', authenticate, isValidId,  async (req, res, next) => {
 try {
  const {_id: owner} = req.user;
  const { contactId: _id } = req.params;
  const response = await Contact.findOne({_id, owner});
  if(response === null){
    res.status(404).json({ message: 'Not found' })
  }
  else {
  res.json(response);
  };

 } 
 catch (error) {
  next(error)
 }
})

router.post('/', authenticate, async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);

    if (error) {
      throw RequestError(400, error.message)
    }

    const {_id: owner} = req.user;
    const result = await Contact.create({...req.body, owner });

    res.status(201).json(result);
  } 
  catch (error) {
    next(error)
  }
})

router.put('/:contactId', authenticate, isValidId, async (req, res, next) => {
  try {
    const {error} = updateSchema.validate(req.body);

    if (error) {
      throw RequestError(400, error.message)
    }

    const { contactId: _id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOneAndUpdate({_id, owner}, req.body, {new: true});
    if(!result) {
      throw RequestError(404, "Not found");
    }
  
    res.json(result);
  } 
  catch (error) {
    next(error)
  }
})

router.patch('/:contactId/favorite', authenticate, isValidId, async (req, res, next) => {
  try {
    const {error} = updateFavoriteSchema.validate(req.body);

    if (error) {
      throw RequestError(400, error.message)
    }

    const { contactId: _id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOneAndUpdate({_id, owner}, req.body, {new: true});
    if(!result) {
      throw RequestError(404, "Not found");
    }
  
    res.json(result);
  } 
  catch (error) {
    next(error)
  }
})

router.delete('/:contactId', authenticate, isValidId, async (req, res, next) => {
  try {
    const {_id: owner} = req.user;
    const { contactId: _id } = req.params;
    const result = await Contact.findOneAndDelete({_id, owner})
    if(!result) {
      throw RequestError(404, "Not found");
    }
    res.json({
      message: "Delete success"
    })
  } 
  catch (error) {
    next(error)
  }
})

=======
const router = express.Router();

<<<<<<< HEAD
const cntrl = require('../../controllers')
>>>>>>> master

const { validateBody, isValidId } = require('../../middlewares');
const schemas = require('../../models/contact');


router.get('/', cntrl.getAllContacts)

router.get('/:contactId',isValidId, cntrl.getOneContactById)

router.post('/', validateBody(schemas.addSchema), cntrl.addContact)

router.delete('/:contactId', isValidId, cntrl.deleteContact)

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), cntrl.updateContactById)

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), cntrl.updateStatusContact);


module.exports = router


=======
const cntrl = require('../../controllers/contacts')

const { validateBody } = require('../../middlewares');

const schemas = require('../../schemas/contacts');


router.get('/', cntrl.getAll)

router.get('/:contactId', cntrl.getById)

router.post('/', validateBody(schemas.addSchema), cntrl.add)

router.delete('/:contactId', cntrl.deleteById)

router.put('/:contactId', validateBody(schemas.addSchema), cntrl.updateById)
  


module.exports = router
>>>>>>> master

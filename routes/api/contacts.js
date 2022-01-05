const express = require('express')
const {NotFound, BadRequest} = require("http-errors")
const router = express.Router();

const {Contact, joiContactAddSchema, joiContactUpdateSchema, joiContactUpdateIsFavoriteSchema} = require('../../models/contact')

router.get('/', async (req, res, next) => {
  res.status(200).json(await Contact.find())
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw NotFound(`Contact with ID: ${id} not found!`)
    }
    res.status(200).json(contact)
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404
    }
    next(error)
  }
  
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = { name, email, phone }
  try { await joiContactAddSchema.validateAsync(newContact)
    const newBody = await Contact.create(newContact)
    res.status(201).json({
      message: `New contact with name: ${newBody.name} successfully created!`,
      data: newBody
    })
  } catch (error) {
    if (error.message.includes("is required")) {
      error.status = 400
      error.message = "missing required fields!"
    }

    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404
    }
    
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByIdAndRemove(id);
    if (!contact) {
      throw NotFound(`Contact with ID: ${id} not found!`)
    }
    res.status(200).json({
      message: `Contact with ID: ${ id } successfully deleted!`,
    })
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404
    }
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const { error } = await joiContactUpdateSchema.validateAsync(req.body)
    if (error) {
      throw new BadRequest(error.message);
    }
    const updateStatusContact = await Contact.findByIdAndUpdate(id, req.body, {new: true})
    if (!updateStatusContact) {
      throw NotFound(`Contact with ID: ${id} not found!`)
    }
    res.status(200).json({
      message: `Contact with ID: ${ id } successfully updated!`,
      data: updateStatusContact
    })
  } catch (error) {
    if (error.message.includes("is required")) {
      error.status = 400
      error.message = "missing required fields!"
    }

    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404
    }

    next(error)
  }
})

router.patch('/:id/favorite', async (req, res, next) => {
  try {
    const { error } = await joiContactUpdateIsFavoriteSchema.validateAsync(req.body)
    if (error) {
      throw new BadRequest(error.message);
    }
    const { id } = req.params;
    const { favorite } = req.body

    const updatedFavoriteContact = await Contact.findByIdAndUpdate(id, { favorite }, { new: true });
    if (!updatedFavoriteContact) {
      throw NotFound();
    }
    res.json({message: `Contact with ID: ${ id } successfully updated!`,
      data: updatedFavoriteContact})
  } catch (error) {
    if (error.message.includes("is required")) {
      error.status = 400
      error.message = "missing field favorite!"
    }

    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404
    }

    next(error)
  }
})

module.exports = router

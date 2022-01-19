const express = require('express')
const { NotFound, BadRequest } = require('http-errors')

const { User } = require('../../models')
const { patchSubscriptionJoiSchema } = require('../../models/user')
const { authenticate } = require('../../middlewares')

const router = express.Router()

router.get('/logout', authenticate, async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  res.sendStatus(204)
})

router.get('/current', authenticate, async (req, res) => {
  const { _id, email } = req.user
  res.json({
    user: {
      _id,
      email,
    },
  })
})

router.patch('/', authenticate, async (req, res, next) => { // третье дополнительное задание
  try {
    const { error } = patchSubscriptionJoiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { _id } = req.user
    const updated = await User.findOneAndUpdate(_id, req.body, { new: true })
    if (!updated) {
      throw new NotFound()
    }
    res.json(updated)
  } catch (error) {
    next(error)
  }
})


module.exports = router
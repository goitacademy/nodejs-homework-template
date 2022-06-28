const { User } = require('../../../models')

const updateSubscription = async(req, res) => {
  const { id, subscription } = req.body
 
  await User.findByIdAndUpdate(id, {subscription}, { new: true})
    .then(data => {
      if(!data) { res.status(404).json({ message: 'Not found', status: 'failure' }) }

      else {
        return res.status(200).json({
          body: data,
          message: 'subscription update', 
          code: 200,
          status: 'success'
        })
    }
    })
    .catch(err => res.status(400).json({ message: err.message, code: 400, status: 'falure' }))
}

module.exports = updateSubscription

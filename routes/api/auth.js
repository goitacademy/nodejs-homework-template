const express = require('express')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
	try {
	} catch (error) {
		next(error)
	}
})

module.exports = router

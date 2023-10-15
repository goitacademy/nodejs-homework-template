import express from 'express'

import moviesControllers from '../../controllers/movies-controllers.js'
const moviesRouter = express.Router()

moviesRouter.get('/', moviesControllers.getAll) 

moviesRouter.get('/:id', moviesControllers.getById) 

moviesRouter.post('/', moviesControllers.add)

moviesRouter.put('/:id', moviesControllers.updateById)

moviesRouter.delete('/:id', moviesControllers.deleteById)






export default moviesRouter

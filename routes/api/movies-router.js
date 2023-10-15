import express from 'express'

import moviesControllers from '../../controllers/movies-controllers.js'
import {validateBody} from "../../decorators/index.js";
import { movieAddSchema, movieUpdateSchema } from '../../schemas/movie-schemas.js';
const moviesRouter = express.Router()

moviesRouter.get('/', moviesControllers.getAll) 

moviesRouter.get('/:id', moviesControllers.getById) 

moviesRouter.post('/', validateBody(movieAddSchema), moviesControllers.add)

moviesRouter.put('/:id', validateBody(movieUpdateSchema), moviesControllers.updateById)

moviesRouter.delete('/:id', moviesControllers.deleteById)



export default moviesRouter

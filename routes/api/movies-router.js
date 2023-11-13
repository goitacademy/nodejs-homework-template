import express from "express";

import moviesController from "../../controllers/movies-controller.js";

import {isEmptyBody} from "../../middlewares/index.js";

const moviesRouter = express.Router();

moviesRouter.get("/", moviesController.getAll);

moviesRouter.get("/:id", moviesController.getById);

moviesRouter.post("/", isEmptyBody, moviesController.add);

moviesRouter.put("/:id", isEmptyBody, moviesController.updateById);

moviesRouter.delete("/:id", moviesController.deleteById);

export default moviesRouter;
import express from "express";
import moviesService from "../../models/movies/index.js";
import {HttpError} from "../../helpers/index.js";

const moviesRouter = express.Router();

moviesRouter.get("/", async (req, res) => {
  try {
    const result = await moviesService.getAllMovies();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

moviesRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await moviesService.getMovieById(id);
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);

    //   const error = new Error(`Movie with id=${id} not found`);
    //   error.status = 404;
    //   throw error;

    //   return res.status(404).json({
    //       message: `Movie with id=${id} not found`
    //     })
    }
    res.json(result);
  } catch (error) {
    const {status = 500, message = "Server error"} = error;
    res.status(status).json({
      message,
    });
  }
});

export default moviesRouter;

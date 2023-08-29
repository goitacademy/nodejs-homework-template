import express from "express";

const usersRouter = express.Router();

usersRouter.post("/signup");

usersRouter.post("/login");

export default usersRouter;

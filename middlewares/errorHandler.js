const chalk = require("chalk");
const { HttpError } = require("../models/HttpError.js");

export const errorHandler = (error, req, res, next) => {
  console.error(chalk.red(error));

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  return res.status(500).json({ error: "Internal server error" });
};

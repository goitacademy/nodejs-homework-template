import mongoose from "mongoose";
import dotenv from "dotenv";

/**
 * @param {string} dbName
 * @param {string} varName
 * @returns {object}
 */

export const connectMongoDb = async (dbName, varName = "DB_HOST") => {
  dotenv.config();
  const connStr = process.env[varName].replace("<db_name>", dbName || "");
  if (process.env.NODE_ENV === "development") console.log(connStr);
  return await mongoose.connect(connStr);
};

/**
 * @param {Error|string} errOrMsg
 * @returns {string}
 */

export const parseValidationErrorMessage = (errOrMsg) => {
  const message = errOrMsg?.message ?? errOrMsg ?? "";
  const [, result] = message.match(/^(?:[^:]+:){2}(.+)$/);
  return result.trim();
};

/**
 * @param {Error|string} errOrMsg
 * @returns {string}
 */

export const parseDupKeyErrorMessage = (errOrMsg) => {
  const message = errOrMsg?.message ?? errOrMsg ?? "";
  const [, result] = message.match(/\{(.+):.+\}$/);
  return result.trim();
};

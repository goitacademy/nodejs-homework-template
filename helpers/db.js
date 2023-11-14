import mongoose from "mongoose";
import "dotenv/config";

const REGEXP = {
  reason: /^(?:[^:]+:){2}\s+(.+)$/,
  collectionName: /^.+:\s+(.+)\s+index/,
  singleDupKey: /{\s+(.+):.+\}$/,
};

const connect = async (dbName, varName = "DB_HOST") => {
  const uri = process.env[varName].replace("<db_name>", dbName || "");
  if (process.env.NODE_ENV === "development") console.log(uri);

  return await mongoose.connect(uri);
};

const parseValidationErrorMessage = (errOrMsg) => {
  const message = errOrMsg?.message ?? errOrMsg ?? "";
  const [, reason] = message.match(REGEXP.reason);

  return { reason };
};

const parseDupKeyErrorMessage = (errOrMsg) => {
  const message = errOrMsg?.message ?? errOrMsg ?? "";

  const [, collection] = message.match(REGEXP.collectionName);
  const [, key] = message.match(REGEXP.singleDupKey);

  return {
    key,
    collection,
  };
};

export const db = {
  connect,
  parseDupKeyErrorMessage,
  parseValidationErrorMessage,
};

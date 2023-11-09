import { model } from "mongoose";
import { hook } from "./hooks.js";
import { mongooseSchema as schema } from "../schemas/users/index.js";

schema.pre("findOneAndUpdate", hook.handlePreUpdateValidate);

schema.post("findOneAndUpdate", hook.handlePostSaveError);
schema.post("save", hook.handlePostSaveError);

export const User = model("user", schema);

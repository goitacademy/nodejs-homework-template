import path from "node:path";

export const ERROR_TYPE = Object.freeze({
  CONTACT_TAKEN: "Contact alredy exist",
  UNAUTHORIZED: "invalid signature",
});

export const temDir = path.join(process.cwd(), "temporaryUpload");
export const updateDir = path.join(process.cwd(), "public", "avatars");

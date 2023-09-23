import fs from "fs/promises";

const isAccessible = (dir) =>
  fs
    .access(dir)
    .then(() => true)
    .catch(() => false);

export const initializeDirectory = async (dir) => {
  if (await isAccessible(dir))
    return console.log(`Directory '${dir}' already initialized.`);

  console.log(`Initializing directory '${dir}'...`);
  await fs.mkdir(dir);
};

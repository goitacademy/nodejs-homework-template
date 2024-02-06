import fs from "fs/promises";

const createFolderIfNotExist = async (uploadDir) => {
     const isAccessible = (uploadDir) => {
       return fs
         .access(uploadDir)
         .then(() => true)
         .catch(() => false);
     };


  if (!(await isAccessible(uploadDir))) {
    await fs.mkdir(uploadDir);
  }

};

export default createFolderIfNotExist;
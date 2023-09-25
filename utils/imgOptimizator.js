import Jimp from "jimp";

const imgOptimizator = async (pathImg, pathSave) => {
  Jimp.read(pathImg, async (err, avatar) => {
    if (err) {
      throw err;
    }
    try {
      await avatar.resize(250, 250).quality(60).writeAsync(pathSave);
      console.log("Image processing completed.");
    } catch (error) {
      console.error("Image processing failed:", error);
    }
  });
};

export default imgOptimizator;

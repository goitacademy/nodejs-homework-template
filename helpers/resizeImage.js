import jimp from "jimp";

export const resizeImg = async (file) => {
  jimp.read(file)
  .then((img) => {
    return img
      .resize(250, 250)
      .writeAsync(file);
  })
  .catch((err) => {
    console.error(err);
  });
}






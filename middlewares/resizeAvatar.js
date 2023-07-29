import Jimp from "jimp";

const resizeAvatar = async ({
  imagePath,
  resizeX = 250,
  resizeY = 250,
  quality = 100,
}) => {
  const image = await Jimp.read(imagePath);
  image.resize(resizeX, resizeY).quality(quality).write(imagePath);
};

export default resizeAvatar;

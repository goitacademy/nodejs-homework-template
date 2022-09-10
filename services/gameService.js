const { Game } = require("../db/gameModel");
const { User } = require("../db/userModel");

const createGame = async (name, title, price, userId) => {
  const game = new Game({ name, title, price, owner: userId });
  await game.save();
  return game;
};

const buyGame = async (game_id, username) => {
  const game = await Game.findById({ _id: game_id });
  const user = await User.findOne({ username: username });
  user.balance -= game.price;
  user.games.push(game._id);
  await user.save();
  return user;
};

module.exports = {
  createGame,
  buyGame,
};

const { Game } = require("../db/gameModel");
const { User } = require("../db/userModel");
const { createGame, buyGame } = require("../services/gameService");

const createGameController = async (req, res) => {
  const { name, title, price } = req.body;

  if (await Game.findOne({ name: name })) {
    return res.status(401).json({
      message: "duplicate",
      description: "Not successful, such game already exists",
    });
  }

  const game = await createGame(name, title, price, userId);
  res.json({ message: "success", description: "success", game_id: game._id });
};

const buyGameController = async (req, res) => {
  const { game_id, username } = req.body;
  const { _id: userId } = req.user;
  const findGame = await Game.findOne({ _id: game_id });
  const findUser = await User.findOne({ username: username, _id: userId });

  if (!findUser) {
    return res.status(401).json({
      message: "unknown",
      description: "Not successful, you can only buy the game for yourself",
    });
  }

  if (!findGame) {
    return res.status(401).json({
      message: "unknown",
      description: "Not successful, unknown game",
    });
  }

  if (findGame.price > findUser.balance) {
    return res.status(401).json({
      message: "insufficient_funds",
      description: "Not successful, insufficient funds",
    });
  }

  const user = await buyGame(game_id, username);
  res.json({
    message: "success",
    description: "success",
    game_id: findGame._id,
    balance: user.balance,
  });
};
module.exports = {
  createGameController,
  buyGameController,
};

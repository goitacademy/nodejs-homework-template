const fs = require("fs").promises
const path = require("path")
const Board = require('../schemas/boardsScheme')

class BoardsService {
  constructor() { }

  async getAll() {
    const boards = await Board.find()
    return boards
  }
  
  async updateBoard(id, newBoard) {
    console.log(newBoard);
    const board = await Board.findOneAndUpdate({ _id: id }, {tasks: [...newBoard.tasks]})
    console.log(board);
    return board
  }

  async addBoardTask(id, newTask) {
    const prevBoard = await Board.findOne({_id: id})
    const board = await Board.findOneAndUpdate({ _id: id }, { tasks: [...prevBoard.tasks, newTask] })
    return board
  }

  async deleteBoardTask(id, taskId) {
    const prevBoard = await Board.findOne({ _id: id })
    const newTaskList = prevBoard.tasks.filter(el => el._id != taskId)
    const board = await Board.findOneAndUpdate({ _id: id }, { tasks: newTaskList })
    return board
  }
}

module.exports = new BoardsService();
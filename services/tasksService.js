const fs = require("fs").promises
const path = require("path")
const Task = require('../schemas/taskScheme')

class TasksService {
    constructor() { }

    async getAll() {
        const tasks = await Task.find()
        return tasks
    }
}

module.exports = new TasksService();
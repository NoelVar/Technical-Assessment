const taskModel = require('../models/task')
const mongoose = require('mongoose')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find({}).sort({ createdAt: -1 })
        
        if (!tasks) {
            return res.status(404).json({ error: 'No tasks found.' })
        }

        return res.status(200).json(tasks)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const createTask = async (req, res) => {
    const { title, description, priority, status, due, assignees } = req.body;

    if (!title || !description || !status || !priority) {
        return res.status(400).json({ error: 'Required field has not been filled in.' })
    }
    
    try {
        const task = await taskModel.create({
            title,
            description,
            priority,
            status,
            due,
            assignees
        })

        if (!task) {
            return res.status(409).json({ error: 'Task could not be created.' })
        }

        res.status(201).json(task)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const updateTask = async (req, res) => {
    const { id, title, description, priority, status, due, assignees } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'Invalid ID fromat.'})
        }

        const task = await taskModel.findById(id)

        if (!task) {
            return res.status(404).json({error: 'Couldn\'t find task in DB.'})
        }

        const updatedData = {
            title: title || task.title,
            description: description || task.description,
            priority: priority || task.priority,
            status: status || task.status,
            due: due || task.due,
            assignees: assignees || task.assignees
        }

        const updatedTask = await taskModel.findOneAndUpdate(
            {_id: id},
            updatedData,
            { new: true }
        )

        if (!updatedTask) {
            return res.status(404).json({error: 'Couldn\'t update task.'})
        }

        return res.status(200).json({message: "Task updated successfully!", task: updatedTask})
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask
}
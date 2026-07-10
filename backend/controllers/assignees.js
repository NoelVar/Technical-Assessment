const assigneeModel = require('../models/assignee')

const getAllAssignees = async (req, res) => {
    try {
        const assignee = await assigneeModel.find({})
        
        if (!assignee) {
            return res.status(404).json({ error: 'No assignees found.' })
        }

        return res.status(200).json(assignee)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const createAssignee = async (req, res) => {
    const { name, email, timezone, location } = req.body;

    if (name === '' || email === '' || timezone === '' || location === '') {
        return res.status(400).json({ error: 'Required field has not been filled in.' })
    }

    try {
        const assignee = await assigneeModel.create({
            name,
            email,
            timezone,
            location
        })

        if (!assignee) {
            return res.status(409).json({ error: 'Assignee could not be created.' })
        }

        res.status(201).json(assignee)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    getAllAssignees,
    createAssignee
}
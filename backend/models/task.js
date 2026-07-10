const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High']
    },
    status: {
        type: String,
        required: true,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do'
    },
    due: {
        type: Date
    },
    assignees: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Assignee'
    }]

},
    {timestamps: true}
)

module.exports = mongoose.model('Task', taskSchema)
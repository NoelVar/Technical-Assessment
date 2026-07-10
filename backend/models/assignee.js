const mongoose = require('mongoose')

const Schema = mongoose.Schema

const assigneeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    timezone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
},
    {timestamps: true}
)

module.exports = mongoose.model('Assignee', assigneeSchema)
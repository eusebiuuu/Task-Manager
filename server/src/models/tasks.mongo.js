const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    }
});

// Task is the singular form of table's actual name (task -> tasks)
const tasks = mongoose.model('Task', taskSchema);

module.exports = tasks;